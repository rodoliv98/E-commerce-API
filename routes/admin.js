import express from 'express'
import { verifyToken } from '../nodeMailer/tokenService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const data = req.headers.authorization;
        if(!data || !data.startsWith('Bearer ')) return res.status(401).json({ msg: 'Token either missing or invalid' });
        
        const token = data.split('Bearer ' )[1];
        verifyToken(token);

        return res.sendStatus(200)
    
    } catch(err){
        return res.sendStatus(401)
    }
})

export default router