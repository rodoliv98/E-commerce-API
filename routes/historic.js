import express from 'express'
import { showHistoric } from '../controllers/historicController.js'

const router = express.Router();

router.get('/', showHistoric)

export default router