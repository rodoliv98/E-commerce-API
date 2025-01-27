import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js'
import { matchedData } from "express-validator";
import { parseQuantity, getCartTotal, reduceQuantityInDatabase, getDate, compareQuantity } from '../utils/utilFunctions.js'

export const showCart = async (req, res) => {
    if(!req.session.cart) return res.status(404).send('You have no itens in the cart');
    const cart = req.session.cart;
    return res.status(200).json({ cart: cart });
}

export const addProductToTheCart = async (req, res) => {
    if(!req.user) return res.status(401).send('Please login first');
    
    const body = matchedData(req);
    const cart = req.session.cart || [];
    
    if(cart.length >= 11) return res.status(400).send('Cart is already full');
    try{
        const foundItem = await compareQuantity(body);
    
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
}

export const createPurchase = async (req, res) => {
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
        await purchase.save();
        req.session.cart = [];
        return res.status(201).json({ message: 'New purchase made', purchase: purchase });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

// vindo da requisição, devo pegar a quantidade dos itens que estao sendo colocados no carrinho
// devo encontrar o item que foi colocado no carrinho no banco de dados
// devo comparar a quantidade dos dois
// se a quantidade que estiver no carrinho for maior que a quantidade do banco de dados devo retornar um erro
/*
    async function compareQuantity(body){
        const foundItem = await Product.find({ item: body.item });
        if(!foundItem) return res.status(404).send('No product found');
        if(foundItem.quantity === body.quantity) return res.status(400).send('Out of stock');
        return foundItem;
    }
*/