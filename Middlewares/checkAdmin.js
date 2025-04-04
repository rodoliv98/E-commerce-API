import { verifyToken } from "../nodeMailer/tokenService.js";

export const checkAdmin = async (req, res, next) => {
    try{
        const data = req.headers.authorization;
        if(!data || !data.startsWith('Bearer ')) return res.status(401).json({ msg: 'Token either missing or invalid' });
    
        const token = data.split('Bearer ' )[1];
        verifyToken(token);

    } catch(err){
        return res.sendStatus(401)
    }

    next()
}