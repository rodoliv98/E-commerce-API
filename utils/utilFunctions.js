import { Product } from "../mongooseSchemas/mongooseCreateProduct.js"
import { generateToken } from '../nodeMailer/tokenService.js'
import { sendVerificationEmail } from '../nodeMailer/emailService.js'

export const parseQuantity = async (body) => {
    const parsedBody = parseInt(body.quantity);
    return parsedBody;
}

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

export const getDate = async () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0'); 
    const mes = String(data.getMonth() + 1).padStart(2, '0'); 
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const isoDate = `${ano}-${mes}-${dia}T${horas}:${minutos}:00`;
    
    return new Date(isoDate); 
}

export const compareQuantity = async (product) => { // check this later
    const foundItem = await Product.findOne({ item: body.item });
    if(!foundItem) throw new Error('No product has been found');
    if(foundItem.quantity < body.quantity) throw new Error('Out of stock');
    return foundItem;
}

export const createOrder = async (person, card, currency, cart, ID) => {
    const getTotal = await getCartTotal(cart);
    const total = `The total is: ` + getTotal + " " + currency;
    await reduceQuantityInDatabase(cart);
    const date = await getDate();
    const newOrder = { person, card, cart, total, date, userID: ID.user };
        
    return newOrder;
}

export const reSendEmailToken = async (id, email) => {
    const token = generateToken(id);
    await sendVerificationEmail(email, token);
}