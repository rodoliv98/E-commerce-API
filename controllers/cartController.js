import { Purchase } from '../mongooseSchemas/mongooseCreatePurchase.js'
import { matchedData } from "express-validator";
import { getCartTotal, reduceQuantityInDatabase, catchError } from '../utils/utilFunctions.js'
import { Product } from '../mongooseSchemas/mongooseCreateProduct.js';

export class CartController {
    static async createPurchase(req, res) {
        const data = matchedData(req);  
        
        for(let i = 0; i < data.cart.length; i++){ 
            const findItem = await Product.findById(data.cart[i].productId);
            if(!findItem) return res.status(404).json({ msg: 'Produto não encontrado na base de dados' });
        }
    
        try{
            await getCartTotal(data.cart, data.total)
            const newPurchase = await Purchase.create({ ...data, userID: req.user.id });
            await reduceQuantityInDatabase(data.cart);
    
            return res.status(200).json({ msg: 'Compra finalizada', purchaseID: newPurchase._id });
    
        } catch(err){
            return catchError(err, res);
        }
    }
}
