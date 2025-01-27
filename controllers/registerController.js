import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from "express-validator"

export const createAccount = async (req, res) => {
    try{
        const data = matchedData(req);
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({ ...data, password: hashedPassword });
        await newUser.save();
        return res.status(200).send('Account created');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
}