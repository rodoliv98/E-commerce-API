import express from 'express'
import passport from 'passport'
import { logIn } from '../controllers/loginController.js'
import { checkSchema } from 'express-validator'
import { userLogin } from '../Schemas/bodySchemas/userLoginSchema.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import '../passportStrats/localStrat.js'

const router = express.Router();

router.post('/', checkSchema(userLogin), bodyValidator, passport.authenticate('local'), logIn)

export default router;