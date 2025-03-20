import { User } from "../mongooseSchemas/mongooseCreateUser.js";

async function checkLogin(req, res, next){
    const user = req.session.passport.user;
    if(!user) return res.status(401).send('Unauthorized');

    try{
        const findUser = await User.findById(user);
        if(!findUser) return res.status(404).send('User not found');
        next();
    } catch(err){
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
    next()
}

export default checkLogin