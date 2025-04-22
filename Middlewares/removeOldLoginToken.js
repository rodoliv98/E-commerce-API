import { verifyToken } from '../nodeMailer/tokenService';

export async function checkIfTokenExpired(req, res) {
    const auth = req.authorizarion.bearer;

    if(!auth) return res.sendStatus(200)

    const removedBearer = auth.split('Bearer ')[1];
    const token = JSON.parse(removedBearer);

    try{
        verifyToken(token.token)
        return res.sendStatus(200)
    } catch(err){
        console.error(err);
        if(err.name === 'TokenExpiredError'){
            return res.status(400).json({ msg: 'Token expired, please login again' })
        }
        return res.status(500).json({ msg: 'Internal server error' })
    }
}