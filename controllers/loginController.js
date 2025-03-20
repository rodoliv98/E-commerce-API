import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from 'express-validator'

export const logIn = async (req, res) => {   
    const data = matchedData(req);
    try{
        const findUser = await User.findOne({ email: data.email });
        if(findUser.emailVerified == false){
            return res.status(400).send('Please verify your email');
        }
        
        return res.status(200).send('Login successful');
    } catch(err){
        console.error(err);
        res.status(500).send('Invalid email or password');
    }
}