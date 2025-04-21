import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import checkLogin from '../Middlewares/checkLogin.js'
import { checkSchema } from 'express-validator'
import { paymentSchema } from '../Schemas/bodySchemas/paymentSchema.js'
import { createPurchase } from '../controllers/cartController.js'

const router = express.Router();

router.post('/payment', checkSchema(paymentSchema), bodyValidator, checkLogin, createPurchase)

export default router