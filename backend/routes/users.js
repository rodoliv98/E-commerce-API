import express from 'express'
import checkLogin from '../Middlewares/checkLogin.js'
import bodyValidator from '../Middlewares/bodyValidator.js';
import { createProfile, patchProfile, showHistoric, showProfile, showUser } from '../controllers/usersProfileController.js'
import { createAddress, patchAddress, showAddresses, deleteAddress } from '../controllers/usersAddressController.js'
import { checkSchema } from 'express-validator';
import { createUserProfile } from '../Schemas/bodySchemas/createUserProfileSchema.js'
import { patchUserProfile } from '../Schemas/bodySchemas/patchUserProfileSchema.js'
import { addressSchema } from '../Schemas/bodySchemas/createAddressSchema.js'
import { patchAddressSchema } from '../Schemas/bodySchemas/patchAddressSchema.js';

const router = express.Router();

router.get('/', checkLogin, showUser)

router.get('/profile', checkLogin, showProfile)

router.get('/address', checkLogin, showAddresses)

router.post('/address', checkSchema(addressSchema), bodyValidator, checkLogin, createAddress)

router.post('/profile', checkSchema(createUserProfile), bodyValidator, checkLogin, createProfile)

router.patch('/profile', checkSchema(patchUserProfile), bodyValidator, checkLogin, patchProfile)

router.patch('/address', checkSchema(patchAddressSchema), bodyValidator, checkLogin, patchAddress)

router.delete('/address/:id', checkLogin, deleteAddress)

router.get('/historic', checkLogin, showHistoric)

export default router