import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema } from 'express-validator'
import { createUserSchema } from '../Schemas/bodySchemas/createUserSchema.js'
import { emailForRecovery } from '../Schemas/bodySchemas/emailSchemaForRecovery.js'
import { passwordChange } from '../Schemas/bodySchemas/passwordChangeSchema.js'
import { tokenSchema } from '../Schemas/querySchemas/verifyTokenSchema.js'
import { RegisterController } from '../controllers/registerController.js'

const router = express.Router();

router.post('/', checkSchema(createUserSchema), bodyValidator, RegisterController.createAccount)

router.post('/recovery-password', checkSchema(emailForRecovery), bodyValidator, RegisterController.recoverPassword)

router.post('/new-password', checkSchema(passwordChange), bodyValidator, RegisterController.newPassword)

router.post('/verify-email', checkSchema(tokenSchema), bodyValidator, RegisterController.verifyEmail)

export default router