import express from 'express'
import { logIn } from '../controllers/loginController.js'
import { checkSchema } from 'express-validator'
import { userLogin } from '../Schemas/bodySchemas/userLoginSchema.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkEmail } from '../Middlewares/checkEmailVerification.js'


const router = express.Router();

router.post('/', checkSchema(userLogin), bodyValidator, checkEmail, logIn)

export default router;