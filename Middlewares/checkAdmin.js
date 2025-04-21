import { verifyToken } from "../nodeMailer/tokenService.js";

export const checkAdmin = async (req, res, next) => {
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ msg: 'Token either missing or invalid' });

        const removedBearer = auth.split('Bearer ' )[1];
        const token = JSON.parse(removedBearer);

        const decoded = verifyToken(token.token);

        if(decoded.userId.isAdmin === false){
            return res.sendStatus(401)
        }

    } catch(err){
        return res.sendStatus(401)
    }

    next()
}