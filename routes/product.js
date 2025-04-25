import express from 'express'
import { checkSchema } from 'express-validator'
import { createProduct } from '../Schemas/bodySchemas/createProductSchema.js'
import { updateProduct } from '../Schemas/bodySchemas/updateProducts.js'
import { ProductController } from '../controllers/productController.js'
import { uploadMiddleware } from '../multer/multer.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import idCheck from '../Middlewares/idCheck.js'
import checkLogin from '../Middlewares/checkLogin.js'
import { checkAdmin } from '../Middlewares/checkAdmin.js'
import { multerController } from '../controllers/multerController.js'

const router = express.Router();

router.get('/', ProductController.showProducts)

router.get('/:id', idCheck, ProductController.showProductsById)

router.post('/', checkSchema(createProduct), checkLogin, checkAdmin, bodyValidator, ProductController.createProductInDb)

router.patch('/:id', checkSchema(updateProduct), checkLogin, checkAdmin, bodyValidator, idCheck, ProductController.patchProductInDb)

router.delete('/:id', checkLogin, checkAdmin, idCheck, ProductController.deleteProductInDb)

router.post('/upload', checkLogin, checkAdmin, uploadMiddleware, multerController)

export default router