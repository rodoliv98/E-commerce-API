import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import checkLogin from '../Middlewares/checkLogin.js'
import { checkSchema } from 'express-validator'
import { cartSchema } from '../Schemas/bodySchemas/cartSchema.js'
import { paymentSchema } from '../Schemas/bodySchemas/paymentSchema.js'
import { showCart, addProductToTheCart, createPurchase, deleteProductFromTheCart, decreaseQuantity, increaseQuantity } from '../controllers/cartController.js'
import { deleteProductSchema } from '../Schemas/bodySchemas/deleteCartProductSchema.js'
import idCheck from '../Middlewares/idCheck.js'

const router = express.Router();

router.get('/', checkLogin, showCart)

router.post('/', checkSchema(cartSchema), bodyValidator, checkLogin, addProductToTheCart)

router.patch('/decrease', checkSchema(cartSchema), bodyValidator, checkLogin, decreaseQuantity)

router.patch('/increase', checkSchema(cartSchema), bodyValidator, checkLogin, increaseQuantity)

router.delete('/', checkSchema(cartSchema), bodyValidator, checkLogin, deleteProductFromTheCart)

router.post('/payment', checkSchema(paymentSchema), bodyValidator, checkLogin, createPurchase)


export default router