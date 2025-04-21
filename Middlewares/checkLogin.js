import { verifyToken } from "../nodeMailer/tokenService.js";

function checkLogin(req, res, next){
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ msg: 'Please login' });
    
    const removedBearer = auth.split('Bearer ' )[1]
    const token = JSON.parse(removedBearer);

    try{
        const payload = verifyToken(token.token);
        req.user = { id: payload.userId.id, role: payload.userId.isAdmin };
        next();

    } catch(err){
        console.error(err)
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({ msg: 'Token expired, please login again' });
        }
        return res.status(401).json({ msg: 'Invalid token' });
    }
    
}

export default checkLogin