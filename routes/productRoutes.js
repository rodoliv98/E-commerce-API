import express from 'express'
import { checkSchema } from 'express-validator'
import { createProduct } from '../Schemas/bodySchemas/createProductSchema.js'
import { updateProduct } from '../Schemas/bodySchemas/updateProducts.js'
import { showProducts, showProductsById, createProductInDb, patchProductInDb, deleteProductInDb } from '../controllers/productController.js'
import { upload } from '../multer/multer.js'
import bodyValidator from '../Middlewares/bodyValidator.js'
import idCheck from '../Middlewares/idCheck.js'

const router = express.Router();

router.get('/', showProducts)

router.get('/:id', idCheck, showProductsById)

router.post('/', checkSchema(createProduct), bodyValidator, createProductInDb)

router.patch('/:id', checkSchema(updateProduct), bodyValidator, idCheck, patchProductInDb)

router.delete('/:id', idCheck, deleteProductInDb)

router.post('/upload', upload.single('image'), (req, res) => {
    if(!req.file) return res.status(400).send('No image sent')

    const imagePath = `/images/${req.file.filename}`;
    res.status(200).send(`Success, image path: ${imagePath}`);
})

export default router