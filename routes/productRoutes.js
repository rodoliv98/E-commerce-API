import express from 'express'
import { checkSchema, matchedData } from 'express-validator'
import { parseQuantity, getCartTotal, reduceQuantityInDatabase, getDate } from '../utils/utilFunctions.js'
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

router.get('/cart', (req, res) => {
    if(!req.session.cart) return res.status(404).send('You have no itens in the cart');
    const cart = req.session.cart;
    return res.status(200).json({ cart: cart });
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

router.post('/cart', checkSchema(cartSchema), bodyValidator, async (req, res) => {
    if(!req.user) return res.status(401).send('Please login first');

    const body = matchedData(req);
    const cart = req.session.cart || [];

    try{
        const foundItem = await Product.findOne({ item: body.item });
        if(!foundItem) return res.status(404).send('Product not found');

        const duplicateItem = cart.find(product => product.item === body.item);
        if(duplicateItem){
            const parsedBody = await parseQuantity(body);
            const index = cart.findIndex(product => product.item === body.item);
            cart[index].quantity = parsedBody;

            return res.status(200).json({ msg: 'Quantity updated', product: cart[index] });
        }

        const parsedBody = await parseQuantity(body);
        const newItem = { _id: foundItem._id,
                          item: foundItem.item,
                          price: foundItem.price,
                          quantity: parsedBody }

        cart.push(newItem);
        req.session.cart = cart;

        return res.status(200).json({ msg: 'Product added to the cart', product: newItem });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

/*router.post('/cart', checkSchema(cartSchema), bodyValidator, async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    const body = matchedData(req);
    const { cart } = req.session;
    try{
        const foundItem = await Product.findOne({ item: body.item });
        if(foundItem === null) return res.status(404).send('Product not found');
        const parsedBody = await parseQuantity(body);
        const newItem = { _id: foundItem._id, 
                          item: foundItem.item, 
                          price: foundItem.price, 
                          quantity: parsedBody };
        //const duplicateItem = cart.find(product => product.item === body.item);
        if(cart){
            //if(duplicateItem) return res.status(400).send('nope')
            cart.push(newItem); // criar uma lógica para impedir que items iguais sejam adicionados no carrinho.
        } else {
            req.session.cart = [newItem];
        }
        return res.status(200).json({ message: 'Product added to the cart', product: newItem });
    } catch(err){
        console.error(err);
        return res.status(500).send('Internal server error');
    }
})*/

router.post('/cart/payment', checkSchema(paymentSchema), bodyValidator, async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    const { person, card, currency } = matchedData(req);
    const cart = req.session.cart;
    const ID = req.session.passport;
    if(!cart) return res.status(400).send('No itens in the cart');
    try{
        const result = await getCartTotal(cart);
        const total = `The total is: ` + result + " " + currency;
        await reduceQuantityInDatabase(cart);
        const date = await getDate();
        const purchase = new Purchase({ person, card, cart, total, date, userID: ID.user });
        await purchase.save()
        return res.status(201).json({ message: 'New purchase made', purchase: purchase });
    } catch(err){
        console.error(err);
        return res.status(500).send('Internal server error');
    }
})

export default router