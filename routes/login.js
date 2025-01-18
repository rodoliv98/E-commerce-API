import express from 'express'
import bcrypt from 'bcrypt'
import passport from 'passport'
import { createUserSchema } from '../bodySchemas/createUserSchema.js'
import { checkSchema, matchedData } from 'express-validator'
import { userLogin } from '../bodySchemas/userLoginSchema.js'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import '../passportStrats/localStrat.js'

const router = express.Router();

router.post('/register', checkSchema(createUserSchema), bodyValidator, async (req, res) => {
    try{
        const data = matchedData(req);
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({ ...data, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ message: 'User created' });
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

router.post('/login', checkSchema(userLogin), bodyValidator, passport.authenticate('local'), (req, res) => {
    try{
        return res.status(200).send('Loged');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

export default router;