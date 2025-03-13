import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from "express-validator"
import { generateEmailToken, verifyEmailToken } from '../nodeMailer/tokenService.js'
import { sendVerificationEmail, sendPasswordRecoveryEmail } from '../nodeMailer/emailService.js'

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

export const recoverPassword = async (req, res) => {
    const data = matchedData(req);
    try{
        const findUser = await User.findOne({ email: data.email });
        if(!findUser) return res.status(404).send('No accounts found with this email');

        const token = generateEmailToken(findUser._id);
        await sendPasswordRecoveryEmail(data.email, token);

        return res.status(200).send('Password recovery email has been sent')
    } catch(err){
        console.error(err)
        return res.status(500).json({ details: err.message })
    }
}

export const newPassword = async (req, res) => {
    const data = matchedData(req);
    const token = req.query.token;
    try{
        const decoded = verifyEmailToken(token);
        const newPassword = await bcrypt.hash(data.password, 10);
        await User.findByIdAndUpdate(decoded.userId, { password: newPassword });
        return res.status(200).send('Password changed!');
    } catch(err){
        console.error(err);
        return res.status(500).json(err.message)
    }
}

export const test1 = async (req, res) => {
    return res.status(200).send('insert new password')
}