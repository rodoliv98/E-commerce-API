import express from 'express'
import { createProfile, patchProfile, showHistoric, showProfile, showUser } from '../controllers/usersController.js'
import checkLogin from '../Middlewares/checkLogin.js'
import { checkSchema } from 'express-validator';
import bodyValidator from '../Middlewares/bodyValidator.js';
import { createUserProfile } from '../Schemas/bodySchemas/createUserProfileSchema.js';
import { patchUserProfile } from '../Schemas/bodySchemas/patchUserProfileSchema.js';

const router = express.Router();

router.get('/', checkLogin, showUser)

router.get('/profile', checkLogin, showProfile)

router.get('/address', checkLogin)

router.post('/address', checkLogin)

router.post('/profile', checkSchema(createUserProfile), bodyValidator, checkLogin, createProfile)

router.patch('/profile', checkSchema(patchUserProfile), bodyValidator, checkLogin, patchProfile)

router.patch('/address', checkLogin)

router.get('/historic', checkLogin, showHistoric)

export default router