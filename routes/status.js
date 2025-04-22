import express from 'express';
import { checkIfTokenExpired } from '../Middlewares/removeOldLoginToken.js';

const router = express.Router();

router.get('/', checkIfTokenExpired)

export default router;