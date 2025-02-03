import express from 'express'
import passport from 'passport'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { checkSchema, matchedData } from 'express-validator'
import { reSendEmailToken } from '../utils/utilFunctions.js'
import { userLogin } from '../Schemas/bodySchemas/userLoginSchema.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import '../passportStrats/localStrat.js'

const router = express.Router();

router.post('/', checkSchema(userLogin), bodyValidator, passport.authenticate('local'), async (req, res) => {
    const data = matchedData(req);
    try{
        const findUser = await User.findOne({ email: data.email });

        if(findUser.emailVerified == false){
            await reSendEmailToken(findUser._id, data.email)
            return res.status(200).send('Your account email has not been verified yet, please check your email to verify');
        }

        return res.status(200).send('Loged');
    } catch(err){
        console.log(err.message);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
})

export default router;