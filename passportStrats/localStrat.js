import passport from "passport"
import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { Strategy } from "passport-local"
import { reSendEmailToken } from "../utils/utilFunctions.js"

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser( async (id, done) => {
    try{
        const findUser = await User.findById(id);
        if(!findUser) throw new Error('User not found');
        done(null, findUser);
    } catch(err){
        done(err, null);
    }
})

export default passport.use(
    new Strategy({ usernameField: 'email' }, async (email, password, done) => {
        try{
            const findUser = await User.findOne({ email });
            if(!findUser) return done(null, false, { message: 'User not found' });

            const isMatch = await bcrypt.compare(password, findUser.password);
            if(!isMatch) return done(null, false, { message: 'Invalid password' });
            
            done(null, findUser);   
        } catch(err){
            done(err, null);
        }
    })
)