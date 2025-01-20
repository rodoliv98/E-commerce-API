import express from 'express'
import { checkSchema, matchedData } from 'express-validator';
import { createProduct } from '../bodySchemas/createProductSchema.js';
import { updateProduct } from '../bodySchemas/updateProducts.js';
import { Product } from '../mongooseSchemas/mongooseCreateProduct.js'
import bodyValidator from '../Middlewares/bodyValidator.js';
import idCheck from '../Middlewares/idCheck.js';

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

router.post('/products', checkSchema(createProduct), bodyValidator, async (req, res) => {
    const data = matchedData(req);
    const newProduct = new Product(data);
    try{
        await newProduct.save();
        return res.status(200).json({ message: 'Product added to data base', product: newProduct });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.patch('/products/:id', checkSchema(updateProduct), bodyValidator, idCheck, async (req, res) => {
    const data = matchedData(req);
    const productID = req.params.id;
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

export default router