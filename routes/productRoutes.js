import express from 'express'
import { checkSchema } from 'express-validator'
import { createProduct } from '../Schemas/bodySchemas/createProductSchema.js'
import { updateProduct } from '../Schemas/bodySchemas/updateProducts.js'
import { showProducts, showProductsById, createProductInDb, patchProductInDb, deleteProductInDb } from '../controllers/productController.js'
import { uploadMiddleware } from '../multer/multer.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import idCheck from '../Middlewares/idCheck.js'
import checkLogin from '../Middlewares/checkLogin.js'
import { checkAdmin } from '../Middlewares/checkAdmin.js'
import { multerController } from '../controllers/multerController.js'

const router = express.Router();

router.get('/', showProducts)

router.get('/:id', idCheck, showProductsById)

router.post('/', checkSchema(createProduct), checkLogin, checkAdmin, bodyValidator, createProductInDb)

router.patch('/:id', checkSchema(updateProduct), checkLogin, checkAdmin, bodyValidator, idCheck, patchProductInDb)

router.delete('/:id', checkLogin, checkAdmin, idCheck, deleteProductInDb)

router.post('/upload', checkLogin, checkAdmin, uploadMiddleware, multerController)

export default router