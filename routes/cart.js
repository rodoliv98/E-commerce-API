import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema } from 'express-validator'
import { cartSchema } from '../Schemas/bodySchemas/cartSchema.js'
import { paymentSchema } from '../Schemas/bodySchemas/paymentSchema.js'
import { showCart, addProductToTheCart, createPurchase } from '../controllers/cartController.js'

const router = express.Router();

router.get('/', showCart)

router.post('/', checkSchema(cartSchema), bodyValidator, addProductToTheCart)

router.post('/payment', checkSchema(paymentSchema), bodyValidator, createPurchase)


export default router