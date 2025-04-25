import { Product } from "../mongooseSchemas/mongooseCreateProduct.js"
import { generateToken } from '../nodeMailer/tokenService.js'
import { sendVerificationEmail } from '../nodeMailer/emailService.js'

export const getCartTotal = async (array, cartTotal) => {
    const total = parseInt(cartTotal);
    let sum = 0;

    for(let i = 0; i < array.length; i++){
        const price = array[i].price;
        const quantity = array[i].quantity;
        const total = price * quantity;
        sum += total;
    }
    sum = sum.toFixed(2, 0);

    if(!sum === total){
        throw new Error('Total price sent by the frontend dont match');
    }
}

export const reduceQuantityInDatabase = async (array) => {
    for(let i = 0; i < array.length; i++){

        const quantity = array[i].quantity;
        const findItem = await Product.findById(array[i].productId);

        if(findItem.quantity < array[i].quantity || array[i].quantity <= 0){
            throw new Error('Out of stock');
        } 

        const updatedQuantity = { quantity: findItem.quantity - quantity };
        await Product.findByIdAndUpdate(array[i].productId, updatedQuantity);
    }
}

export const reSendEmailToken = async (id, email) => {
    const token = generateToken(id);
    await sendVerificationEmail(email, token);
}

export const catchError = async (err, res) => {
    console.error(err);

    if (err.message === 'Out of stock') {
        return res.status(400).json({ msg: 'Produto sem estoque suficiente.' });
    }

    if (err.message === 'Total price sent by the frontend dont match') {
        return res.status(400).json({ msg: 'Good try, but the total price sent by the frontend dont match' });
    }

    return res.status(500).json({ msg: 'Internal server error' });
}