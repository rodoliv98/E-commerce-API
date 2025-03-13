import { Product } from "../mongooseSchemas/mongooseCreateProduct.js";
import { matchedData } from "express-validator";
import Redis from 'redis'

export const client = Redis.createClient();

export const showProducts = async (req, res) => {
    try{
        const cachedProducts = await client.get('products');
        if(cachedProducts != null){
            console.log('hit');
            return res.status(200).json(JSON.parse(cachedProducts))
        }
        const findProducts = await Product.find();
        if(!findProducts) return res.status(404).send('No products found')
        console.log('miss')
        await client.setEx('products', 3600, JSON.stringify(findProducts));
        return res.status(200).json({ products: findProducts })
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const showProductsById = async (req, res) => {
    try{
        const cachedProducts = await client.get(`products:${req.params.id}`)
        if(cachedProducts != null){
            console.log('hit')
            return res.status(200).json(JSON.parse(cachedProducts))
        }
        const findItens = await Product.findOne({ _id: req.params.id });
        if(!findItens) return res.status(404).send('Product not found');
        
        console.log('miss')
        await client.setEx(`products:${req.params.id}`, 3600, JSON.stringify(findItens))
        return res.status(200).json({ product: findItens });
    } catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const createProductInDb = async (req, res) => {
    const data = matchedData(req);
    const newProduct = new Product(data);
    try{
        await newProduct.save();
        return res.status(201).json({ msg: 'Product added to data base', product: newProduct });
    } catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const patchProductInDb = async (req, res) => {
    const data = matchedData(req);
    try{
        const updatedItem = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
        if(!updatedItem) return res.status(404).send('Product not found');
        return res.status(200).json({ product: updatedItem });
    } catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const deleteProductInDb = async (req, res) => {
    try{
        const deletedItem = await Product.findByIdAndDelete({ _id: req.params.id });
        if(!deletedItem) return res.status(404).send('Product not found');
        return res.status(200).json({ msg: 'Product deleted from data base', product: deletedItem });
    } catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}