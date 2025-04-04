import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js'
import { matchedData } from "express-validator";
import { reduceQuantityInDatabase } from '../utils/utilFunctions.js'
import { Product } from '../mongooseSchemas/mongooseCreateProduct.js';

export const showCart = async (req, res) => {
    if(!req.session.cart) return res.status(404).send('You have no itens in the cart');
    const cart = req.session.cart;
    return res.status(200).json(cart);
}

export const addProductToTheCart = async (req, res) => {  
    const body = matchedData(req);
    const cart = req.session.cart || [];

    try{
        const findItem = await Product.findById(body.productId);
        if(!findItem) return res.status(404).send('Product not found');
        
        const duplicateItem = cart.find(product => product.item === findItem.item);
        if(duplicateItem){
            const index = cart.findIndex(product => product.item === findItem.item);
            if(cart[index].quantity >= 10) return res.status(400).send('You can only have 10 of the same item in the cart');
            if(cart[index].quantity > findItem.quantity) return res.status(400).send('Out of sotck');
            cart[index].quantity++;
            return res.status(200).json({ msg: 'Quantity updated', product: cart[index] });
        }
    
        const newItem = { _id: findItem._id,
                          item: findItem.item,
                          price: findItem.price,
                          quantity: 1 }
        cart.push(newItem);
        req.session.cart = cart;
        
        return res.status(200).json({ msg: 'Product added to the cart', product: newItem });
        
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const increaseQuantity = async (req, res) => {
    const data = matchedData(req); 
    const cart = req.session.cart; 
    try{
        const item = await Product.findById(data.productId);
        if(!item) return res.status(404).send('Product not found');

        const index = cart.findIndex(product => product.item === item.item);
        if(cart[index].quantity >= 10) return res.status(400).send('You can only have 10 of the same item in the cart');
        cart[index].quantity++;
        return res.status(200).json({ msg: 'Quantity updated', product: cart[index] });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const decreaseQuantity = async (req, res) => {
    const data = matchedData(req); 
    const cart = req.session.cart; 
    try{
        const item = await Product.findById(data.productId);
        if(!item) return res.status(404).send('Product not found');

        const index = cart.findIndex(product => product.item === item.item);
        cart[index].quantity--;
        if(cart[index].quantity === 0) cart.splice(index, 1);

        return res.status(200).json({ msg: 'Quantity updated', product: cart[index] });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const deleteProductFromTheCart = async (req, res) => {
    const data = matchedData(req);
    const cart = req.session.cart;

    try{
        const item = await Product.findById(data.productId);
        if(!item) return res.status(404).send('Product not found');
        
        const foundItem = cart.findIndex(product => product.item === item.item);
        if(foundItem === -1) return res.sendStatus(404);
        if(foundItem > -1) cart.splice(foundItem, 1);

        return res.status(200).json(cart)

    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const createPurchase = async (req, res) => {
    const data = matchedData(req);
    const ID = req.session.passport.user;
    try{
        const newPurchase = await Purchase.create({ 
                                    fullName: data.fullName,
                                    cpf: data.cpf,
                                    birthDate: data.birthDate,
                                    country: data.country,
                                    state: data.state,
                                    city: data.city,
                                    street: data.street,
                                    houseNumber: data.houseNumber,
                                    cep: data.cep,
                                    cart: data.cart,
                                    card: data.cardNumber,
                                    total: data.total,
                                    currency: data.currency,
                                    userID: ID
                                });
        await reduceQuantityInDatabase(data.cart)
        req.session.cart = [];
        return res.status(200).json({ msg: 'Purchase made', purchaseID: newPurchase._id });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}