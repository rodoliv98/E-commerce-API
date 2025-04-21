import express from 'express'
import { verifyToken } from '../nodeMailer/tokenService.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const data = req.headers.authorization;
        if(!data || !data.startsWith('Bearer ')) return res.status(401).json({ msg: 'Token either missing or invalid' });
        
        const removedBearer = auth.split('Bearer ' )[1]
        const token = JSON.parse(removedBearer);
        
        const payload = verifyToken(token);

        if(payload.userId.isAdmin === false){
            return res.sendStatus(401);
        }

        return res.sendStatus(200)
    
    } catch(err){
        return res.sendStatus(401)
    }
})

export default router