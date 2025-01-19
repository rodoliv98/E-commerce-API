import express from 'express'
import { checkSchema, matchedData } from 'express-validator';
import { createProduct } from '../bodySchemas/createProductSchema.js';
import { Product } from '../mongooseSchemas/mongooseCreateProduct.js'
import bodyValidator from '../Middlewares/bodyValidator.js';

const router = express.Router();

router.get('/products', async (req, res) => {
    try{
        const findItens = await Product.find();
        if(!findItens) return res.status(404).send('Couldnt find any product');
        return res.status(200).json({ findItens });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.post('/products',checkSchema(createProduct), bodyValidator, async (req, res) => {
    try{
        const data = matchedData(req);
        const newProduct = new Product(data);
        await newProduct.save();
        return res.status(200).send('Product added to data base');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

export default router