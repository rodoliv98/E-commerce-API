import passport from "passport"
import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { Strategy } from "passport-local"

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    try{
        const findUser = User.findById(id);
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
            if(!findUser) throw new Error('User not found');
            const isMatch = await bcrypt.compare(password, findUser.password);
            if(!isMatch) throw new Error('Invalid password');
            done(null, findUser);   
        } catch(err){
            done(err, null);
        }
    })
)