import util from 'util'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from 'express-validator'
import { generateToken } from '../nodeMailer/tokenService.js';

export const logIn = async (req, res) => {   
    const data = matchedData(req);
    try{
        const findUser = await User.findOne({ email: data.email });
        
        if(findUser.isAdmin){
            const token = generateToken(findUser.isAdmin);
            return res.status(200).json({ msg: 'Login successful', token });
        }

        return res.status(200).send('Login successful');
    } catch(err){
        console.error(err);
        res.status(500).send('Invalid email or password');
    }
}


export const logOut = async (req, res) => {
    try {
        if (!req.session) {
            return res.status(400).json({ success: false, message: 'No active session to log out' });
        }

        const destroySession = util.promisify(req.session.destroy.bind(req.session));
        await destroySession();

        res.clearCookie('connect.sid');
        return res.status(200).json({ msg: 'Logged out' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Failed to destroy session' });
    }
};