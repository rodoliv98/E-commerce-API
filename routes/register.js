import express from 'express'
import bcrypt from 'bcrypt'
import bodyValidator from '../Middlewares/bodyValidator.js';
import { checkSchema, matchedData } from 'express-validator'
import { User } from '../mongooseSchemas/mongooseCreateUser.js';
import { createUserSchema } from '../bodySchemas/createUserSchema.js'

const router = express.Router();

router.post('/', checkSchema(createUserSchema), bodyValidator, async (req, res) => {
    try{
        const data = matchedData(req);
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({ ...data, password: hashedPassword });
        await newUser.save();
        return res.status(200).send('User created');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

export default router