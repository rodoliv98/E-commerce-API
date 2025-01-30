import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from "express-validator"

export const createAccount = async (req, res) => {
    const data = matchedData(req);
    try{
        const emailExist = await User.findOne({ email: data.email });
        if(emailExist) return res.status(400).send('This email is already being used');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({ ...data, password: hashedPassword });
        await newUser.save();
        return res.status(200).send('Account created');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
}