import express from 'express'
import { checkSchema, matchedData } from 'express-validator'
import { createProduct } from '../bodySchemas/createProductSchema.js'
import { cartSchema } from '../bodySchemas/cartSchema.js'
import { paymentSchema } from '../bodySchemas/paymentSchema.js'
import { updateProduct } from '../bodySchemas/updateProducts.js'
import { Product } from '../mongooseSchemas/mongooseCreateProduct.js'
import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import idCheck from '../Middlewares/idCheck.js'

const router = express.Router();

router.get('/products', async (req, res) => {
    try{
        const findItens = await Product.find();
        if(!findItens) return res.status(404).send('Couldnt find any product');
        return res.status(200).json({ products: findItens });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.get('/products/:id', idCheck, async (req, res) => {
    try{
        const findItens = await Product.findOne({ _id: req.params.id });
        if(!findItens) return res.status(404).send('Product not found');
        return res.status(200).json({ product: findItens });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.get('/historic', async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    const ID = req.session.passport;
    try{
        const showBuys = await Purchase.find({ "cart.userID": ID.user });
        if(showBuys.length === 0) return res.status(404).send('No historic');
        return res.status(200).json({ historic: showBuys });
    } catch(err){
        console.error(err);
        return res.status(500).send('Internal server error');
    }
})

router.post('/products', checkSchema(createProduct), bodyValidator, async (req, res) => {
    const data = matchedData(req);
    const newProduct = new Product(data);
    try{
        await newProduct.save();
        return res.status(201).json({ message: 'Product added to data base', product: newProduct });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.patch('/products/:id', checkSchema(updateProduct), bodyValidator, idCheck, async (req, res) => {
    const data = matchedData(req);
    try{
        const updatedItem = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        if(!updatedItem) return res.status(404).send('Product not found');
        return res.status(200).json({ product: updatedItem });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.delete('/products/:id', idCheck, async (req, res) => {
    try{
        const deletedItem = await Product.findByIdAndDelete({ _id: req.params.id });
        if(!deletedItem) return res.status(404).send('Product not found');
        return res.status(200).json({ product: deletedItem });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

async function parseQuantity(body){
    const parsedBody = parseInt(body.quantity);
    return parsedBody;
}

router.post('/cart', checkSchema(cartSchema), bodyValidator, async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    const body = matchedData(req);
    const { cart } = req.session;
    const ID = req.session.passport;
    try{
        const foundItem = await Product.findOne({ item: body.item });
        if(foundItem === null) return res.status(404).send('Product not found');
        const parsedBody = await parseQuantity(body);
        const newItem = { _id: foundItem._id, 
                          item: foundItem.item, 
                          price: foundItem.price, 
                          quantity: parsedBody, 
                          userID: ID.user };
        if(cart){
            cart.push(newItem); // criar uma lógica para impedir que items iguais sejam adicionados no carrinho.
        } else {
            req.session.cart = [newItem];
        }
        return res.status(200).json({ message: 'Product added to the cart', product: newItem });
    } catch(err){
        console.error(err);
        return res.status(500).send('Internal server error');
    }
})

async function getCartTotal(array){
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        const price = array[i].price;
        const quantity = array[i].quantity;
        const total = price * quantity;
        sum += total;
    }
    sum = sum.toFixed(2, 0);
    return sum;
}

async function reduceQuantityInDatabase(array){
    for(let i = 0; i < array.length; i++){
        const quantity = array[i].quantity;
        const findItem = await Product.findById(array[i]._id);
        const updatedQuantity = { quantity: findItem.quantity - quantity };
        await Product.findByIdAndUpdate(array[i]._id, updatedQuantity);
    }
}

async function getDate(){
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0'); 
    const mes = String(data.getMonth() + 1).padStart(2, '0'); 
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const isoDate = `${ano}-${mes}-${dia}T${horas}:${minutos}:00`;
    
    return new Date(isoDate); 
}

router.post('/cart/payment', checkSchema(paymentSchema), bodyValidator, async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    const { person, card, currency } = matchedData(req);
    const cart = req.session.cart;
    if(!cart) return res.status(400).send('No itens in the cart');
    try{
        const result = await getCartTotal(cart);
        const total = `The total is: ` + result + " " + currency;
        await reduceQuantityInDatabase(cart);
        const date = await getDate();
        const newBuy = { person, card, cart, total, date };
        const purchase = new Purchase(newBuy);
        await purchase.save()
        return res.status(201).json({ message: 'New purchase made', purchase: purchase });
    } catch(err){
        console.error(err);
        return res.status(500).send('Internal server error');
    }
})

export default router