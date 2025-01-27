import express from 'express'
import { checkSchema } from 'express-validator'
import { createProduct } from '../bodySchemas/createProductSchema.js'
import { updateProduct } from '../bodySchemas/updateProducts.js'
import { showProducts, showProductsById, createProductInDb, patchProductInDb, deleteProductInDb } from '../controllers/productController.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import idCheck from '../Middlewares/idCheck.js'

const router = express.Router();

router.get('/', showProducts)

router.get('/:id', idCheck, showProductsById)

router.post('/', checkSchema(createProduct), bodyValidator, createProductInDb)

router.patch('/:id', checkSchema(updateProduct), bodyValidator, idCheck, patchProductInDb)

router.delete('/:id', idCheck, deleteProductInDb)

export default router
