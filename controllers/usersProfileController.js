import { matchedData } from "express-validator";
import { Purchase } from "../mongooseSchemas/mongooseCreatePurchase.js";
import { User } from "../mongooseSchemas/mongooseCreateUser.js";
import { Profile } from "../mongooseSchemas/mongooseCreateUserProfile.js";

export const showUser = async (req, res) => {
    const ID = req.user.id;
    try{
        const findUser = await User.findOne({ _id: ID })
        if(!findUser) return res.status(404).send('No user found');
        return res.status(200).json({ msg: findUser.firstName, email: findUser.email })
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const showProfile = async (req, res) => {
    const ID = req.user.id;
    try{
        const findProfile = await Profile.findOne({ userID: ID });
        if(!findProfile) return res.status(404).send('Not found');
        return res.status(200).json({ findProfile });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const createProfile = async (req, res) => {
    const data = matchedData(req);
    const ID = req.user.id;
    try{
        const newProfile = new Profile({...data, userID: ID });
        await newProfile.save();
        return res.status(200).json({ msg: 'Profile created', details: newProfile });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const patchProfile = async (req, res) => {
    const data = matchedData(req);
    const ID = req.user.id;
    try{
        const updatedProfile = await Profile.findOneAndUpdate({ userID: ID }, data, { new: true });
        return res.status(200).json({ msg: 'Profile updated', details: updatedProfile })
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}

export const showHistoric = async (req, res) => {
    const ID = req.session.passport;
    try{
        const showPurchases = await Purchase.find({ userID: ID.user });
        if(showPurchases.length === 0) return res.status(404).send('No historic');
        const historic = showPurchases.map(buy => ({
            id: buy._id,
            fullName: buy.fullName,
            total: buy.total,
            state: buy.state,
            city: buy.city,
            street: buy.street,
            houseNumber: buy.houseNumber,
            cep: buy.cep,
            cart: buy.cart,
            date: buy.createdAt,
            currency: buy.currency
        }))
        console.log(historic)
        return res.status(200).json({historic});
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}