import mongoose from "mongoose"
import { Product } from "../mongooseSchemas/mongooseCreateProduct.js";

async function idCheck(req, res, next){
    const id = req.params.id;
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send('ID either missing or invalid');
    }
    try{
        const checkId = await Product.findById(id);
        if(!checkId) return res.status(404).send('Product not found');
        next();
    } catch(err){
        console.error(err);
        return res.status(500).send('Internal server error');
    }
}

export default idCheck