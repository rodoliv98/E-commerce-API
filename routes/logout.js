import express from 'express'
import { logOut } from '../controllers/loginController.js'

const router = express.Router();

router.post('/', logOut)

export default router