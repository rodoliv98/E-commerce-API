import express from 'express'
import checkLogin from '../Middlewares/checkLogin.js';
import bodyValidator from '../Middlewares/bodyValidator.js';
import { UsersProfileController } from '../controllers/usersProfileController.js'
import { UsersAddressController } from '../controllers/usersAddressController.js'
import { checkSchema } from 'express-validator';
import { createUserProfile } from '../Schemas/bodySchemas/createUserProfileSchema.js'
import { patchUserProfile } from '../Schemas/bodySchemas/patchUserProfileSchema.js'
import { addressSchema } from '../Schemas/bodySchemas/createAddressSchema.js'
import { patchAddressSchema } from '../Schemas/bodySchemas/patchAddressSchema.js';
import ageValidator from '../Middlewares/birthDateValidator.js';

const router = express.Router();

router.get('/', checkLogin, UsersProfileController.showUser)

router.get('/profile', checkLogin, UsersProfileController.showProfile)

router.get('/address', checkLogin, UsersAddressController.showAddresses)

router.post('/address', checkSchema(addressSchema), bodyValidator, checkLogin, UsersAddressController.createAddress)

router.post('/profile', checkSchema(createUserProfile), bodyValidator, ageValidator, checkLogin, UsersProfileController.createProfile)

router.patch('/profile', checkSchema(patchUserProfile), bodyValidator, checkLogin, UsersProfileController.patchProfile)

router.patch('/address/:id', checkSchema(patchAddressSchema), bodyValidator, checkLogin, UsersAddressController.patchAddress)

router.delete('/address/:id', checkLogin, UsersAddressController.deleteAddress)

router.get('/historic', checkLogin, UsersProfileController.showHistoric)

export default router