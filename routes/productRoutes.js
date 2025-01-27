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

router.get('/', async (req, res) => {
    try{
        const findItens = await Product.find();
        if(!findItens) return res.status(404).send('Couldnt find any product');
        return res.status(200).json({ products: findItens });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

router.get('/:id', idCheck, async (req, res) => {
    try{
        const findItens = await Product.findOne({ _id: req.params.id });
        if(!findItens) return res.status(404).send('Product not found');
        return res.status(200).json({ product: findItens });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

router.post('/', checkSchema(createProduct), bodyValidator, async (req, res) => {
    const data = matchedData(req);
    const newProduct = new Product(data);
    try{
        await newProduct.save();
        return res.status(201).json({ msg: 'Product added to data base', product: newProduct });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

router.patch('/:id', checkSchema(updateProduct), bodyValidator, idCheck, async (req, res) => {
    const data = matchedData(req);
    try{
        const updatedItem = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        if(!updatedItem) return res.status(404).send('Product not found');
        return res.status(200).json({ product: updatedItem });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

router.delete('/:id', idCheck, async (req, res) => {
    try{
        const deletedItem = await Product.findByIdAndDelete({ _id: req.params.id });
        if(!deletedItem) return res.status(404).send('Product not found');
        return res.status(200).json({ msg: 'Product deleted from data base', product: deletedItem });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

export default router