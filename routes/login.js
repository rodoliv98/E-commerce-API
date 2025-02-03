import express from 'express'
import passport from 'passport'
import { checkSchema } from 'express-validator'
import { userLogin } from '../Schemas/bodySchemas/userLoginSchema.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import '../passportStrats/localStrat.js'

const router = express.Router();

router.post('/', checkSchema(userLogin), bodyValidator, passport.authenticate('local'), (req, res) => {
    try{
        return res.status(200).send('Loged');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal server error');
    }
})

export default router;