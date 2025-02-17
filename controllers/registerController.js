import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from "express-validator"
import { generateEmailToken, verifyEmailToken } from '../nodeMailer/tokenService.js'
import { sendVerificationEmail } from '../nodeMailer/emailService.js'

export const createAccount = async (req, res) => {
    const data = matchedData(req);
    try{
        const emailExist = await User.findOne({ email: data.email });
        if(emailExist) return res.status(400).send('This email is already being used');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({ ...data, password: hashedPassword });
        await newUser.save();
        const token = generateEmailToken(newUser._id);
        await sendVerificationEmail(data.email, token);

        return res.status(201).send('Account created');
    } catch(err){
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const verifyEmail = async (req, res) => {
    const token = req.query.token;
    try{
        const decoded = verifyEmailToken(token);
        await User.findByIdAndUpdate(decoded.userId, { emailVerified: true });
        return res.status(200).send('Email verified!');
    } catch(err){
        console.error(err);
        return res.status(400).json({ msg: 'Token either invalid or expired', details: err.message });
    }
}