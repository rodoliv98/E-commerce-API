import { Product } from "../mongooseSchemas/mongooseCreateProduct.js";
import { matchedData } from "express-validator";
import { catchError } from "../utils/utilFunctions.js";

export class ProductController {
    static async showProducts(req, res) {
        try{
            const findProducts = await Product.find();
            if(!findProducts) return res.status(404).send('No products found');
            return res.status(200).json({ products: findProducts });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async showProductsById(req, res) {
        const id = req.params.id;
        if(!id) return res.status(400).send('Product id not provided');
        if(id.length !== 24) return res.status(400).send('Invalid product id');
        try{
            const findItens = await Product.findById(id);
            if(!findItens) return res.status(404).send('Product not found');
            return res.status(200).json({ product: findItens });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async createProductInDb(req, res) {
        const data = matchedData(req);
        try{
            await Product.create(data);
            return res.status(201).json({ msg: 'Product added to data base' });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async patchProductInDb(req, res) {
        const data = matchedData(req);
        try{
            const updatedItem = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
            if(!updatedItem) return res.status(404).send('Product not found');
            return res.status(200).json({ product: updatedItem });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async deleteProductInDb(req, res) {
        try{
            const deletedItem = await Product.findByIdAndDelete({ _id: req.params.id });
            if(!deletedItem) return res.status(404).send('Product not found');
            return res.status(200).json({ msg: 'Product deleted from data base', product: deletedItem });
        } catch(err){
            return catchError(err, res);
        }
    }
}