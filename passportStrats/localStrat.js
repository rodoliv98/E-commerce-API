import passport from "passport"
import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { Strategy } from "passport-local"
import { reSendEmailToken } from "../utils/utilFunctions.js"

passport.serializeUser((user, done) => {
    console.log('serialize')
    console.log(user)
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
            console.log('inside passport')
            const findUser = await User.findOne({ email });
            if(!findUser) throw new Error('User not found');
            console.log(findUser)
            const isMatch = await bcrypt.compare(password, findUser.password);
            if(!isMatch) throw new Error('Invalid password');
            if(findUser.emailVerified == false){
                await reSendEmailToken(findUser._id, email);
            }
            
            done(null, findUser);   
        } catch(err){
            done(err, null);
        }
    })
)