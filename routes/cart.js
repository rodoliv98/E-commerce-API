import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema } from 'express-validator'
import { cartSchema } from '../bodySchemas/cartSchema.js'
import { paymentSchema } from '../bodySchemas/paymentSchema.js'
import { showCart, addProductToTheCart, createPurchase } from '../controllers/cartController.js'

const router = express.Router();

router.get('/', showCart)

router.post('/', checkSchema(cartSchema), bodyValidator, addProductToTheCart)

router.post('/payment', checkSchema(paymentSchema), bodyValidator, createPurchase)


export default router