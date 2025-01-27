import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema, matchedData } from 'express-validator'
import { Product } from '../mongooseSchemas/mongooseCreateProduct.js'
import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js'
import { cartSchema } from '../bodySchemas/cartSchema.js'
import { paymentSchema } from '../bodySchemas/paymentSchema.js'
import { parseQuantity, getCartTotal, reduceQuantityInDatabase, getDate } from '../utils/utilFunctions.js'

const router = express.Router();

router.get('/', (req, res) => {
    if(!req.session.cart) return res.status(404).send('You have no itens in the cart');
    const cart = req.session.cart;
    return res.status(200).json({ cart: cart });
})

router.post('/', checkSchema(cartSchema), bodyValidator, async (req, res) => {
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

router.post('/payment', checkSchema(paymentSchema), bodyValidator, async (req, res) => {
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
})


export default router