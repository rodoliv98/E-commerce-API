import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from 'express-validator'
import { generateToken } from '../nodeMailer/tokenService.js';

export class LoginController {
    static async logIn(req, res) {   
        const data = matchedData(req);

        try{
            const findUser = await User.findOne({ email: data.email });
            if(!findUser) return res.status(404).json({ msg: 'Nenhuma conta foi encontrada com esse email' });
            
            const isMatch = await bcrypt.compare(data.password, findUser.password);
            if(!isMatch) return res.status(401).json({ msg: 'Senha incorreta' });
            
            const payload = { id: findUser._id, isAdmin: findUser.isAdmin };
            const token = generateToken(payload);

            return res.status(200).json({ msg: 'Login successful', token});
        } catch(err){
            return catchError(err, res);
        }
    }
}