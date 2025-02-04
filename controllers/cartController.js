import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js'
import { matchedData } from "express-validator";
import { parseQuantity, compareQuantity, createOrder } from '../utils/utilFunctions.js'

export const showCart = async (req, res) => {
    if(!req.session.cart) return res.status(404).send('You have no itens in the cart');
    console.log(req.user)
    const cart = req.session.cart;
    return res.status(200).json({ cart: cart });
}

export const addProductToTheCart = async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    
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
        console.error(err.message);
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
        const newOrder = await createOrder(person, card, currency, cart, ID);
        const purchase = new Purchase(newOrder);
        await purchase.save();
        req.session.cart = [];
        return res.status(201).json({ message: 'New purchase made', purchase: purchase });
    } catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}