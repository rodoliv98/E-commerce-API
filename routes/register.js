import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema } from 'express-validator'
import { createUserSchema } from '../Schemas/bodySchemas/createUserSchema.js'
import { tokenSchema } from '../Schemas/querySchemas/verifyTokenSchema.js'
import { createAccount, verifyEmail } from '../controllers/registerController.js'

const router = express.Router();

router.post('/', checkSchema(createUserSchema), bodyValidator, createAccount)

router.get('/verify-email', checkSchema(tokenSchema), bodyValidator, verifyEmail)

export default router