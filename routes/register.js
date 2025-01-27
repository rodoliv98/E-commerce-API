import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema } from 'express-validator'
import { createUserSchema } from '../bodySchemas/createUserSchema.js'
import { createAccount } from '../controllers/registerController.js'

const router = express.Router();

router.post('/', checkSchema(createUserSchema), bodyValidator, createAccount)

export default router