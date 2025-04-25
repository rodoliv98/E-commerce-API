import express from 'express'
import { checkSchema } from 'express-validator'
import { userLogin } from '../Schemas/bodySchemas/userLoginSchema.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkEmail } from '../Middlewares/checkEmailVerification.js'
import { LoginController } from '../controllers/loginController.js'

const router = express.Router();

router.post('/', checkSchema(userLogin), bodyValidator, checkEmail, LoginController.logIn)

export default router;