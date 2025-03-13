import express from 'express'
import bodyValidator from '../Middlewares/bodyValidator.js'
import { checkSchema } from 'express-validator'
import { createUserSchema } from '../Schemas/bodySchemas/createUserSchema.js'
import { emailForRecovery } from '../Schemas/bodySchemas/emailSchemaForRecovery.js'
import { passwordChange } from '../Schemas/bodySchemas/passwordChangeSchema.js'
import { tokenSchema } from '../Schemas/querySchemas/verifyTokenSchema.js'
import { createAccount, newPassword, recoverPassword, test1, verifyEmail } from '../controllers/registerController.js'

const router = express.Router();

router.post('/', checkSchema(createUserSchema), bodyValidator, createAccount)

router.post('/recovery-password', checkSchema(emailForRecovery), bodyValidator, recoverPassword)

router.post('/new-password', checkSchema(passwordChange), bodyValidator, newPassword)

router.post('/verify-email', checkSchema(tokenSchema), bodyValidator, verifyEmail)

router.get('/change-password', test1)

export default router