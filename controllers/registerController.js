import bcrypt from 'bcrypt'
import { User } from '../mongooseSchemas/mongooseCreateUser.js'
import { matchedData } from "express-validator"
import { generateToken, verifyToken } from '../nodeMailer/tokenService.js'
import { sendVerificationEmail, sendPasswordRecoveryEmail } from '../nodeMailer/emailService.js'

export const createAccount = async (req, res) => {
    const data = matchedData(req);
    try{
        const emailExist = await User.findOne({ email: data.email });
        if(emailExist) return res.status(400).send('Esse email já está cadastrado');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({ ...data, password: hashedPassword });

        const token = generateToken(newUser._id);
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
        const decoded = verifyToken(token);
        await User.findByIdAndUpdate(decoded.userId, { emailVerified: true });
        return res.status(200).send('Seu email foi verificado com sucesso! Você já pode fazer login');
    } catch(err){
        console.error(err);
        return res.status(400).json({ msg: 'Token either invalid or expired', details: err.message });
    }
}

export const recoverPassword = async (req, res) => {
    const data = matchedData(req);
    try{
        const findUser = await User.findOne({ email: data.email });
        if(!findUser) return res.status(404).send('Nenhum usuário encontrado com esse email');

        const token = generateToken(findUser._id);
        await sendPasswordRecoveryEmail(data.email, token);

        return res.status(200).send('Email enviado! Verifique sua caixa de entrada para redefinir sua senha');
    } catch(err){
        console.error(err)
        return res.status(500).json({ details: err.message })
    }
}

export const newPassword = async (req, res) => {
    const data = matchedData(req);
    const token = req.query.token;
    try{
        const decoded = verifyToken(token);
        const newPassword = await bcrypt.hash(data.password, 10);
        await User.findByIdAndUpdate(decoded.userId, { password: newPassword });
        return res.status(200).send('Senha alterada!');
    } catch(err){
        console.error(err);
        return res.status(500).json(err.message)
    }
}