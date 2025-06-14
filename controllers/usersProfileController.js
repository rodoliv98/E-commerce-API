import { matchedData } from "express-validator";
import { Purchase } from "../mongooseSchemas/mongooseCreatePurchase.js";
import { User } from "../mongooseSchemas/mongooseCreateUser.js";
import { Profile } from "../mongooseSchemas/mongooseCreateUserProfile.js";
import { catchError } from "../utils/utilFunctions.js";

export class UsersProfileController {
    static async showUser(req, res) {
        const ID = req.user.id;
        try{
            const findUser = await User.findOne({ _id: ID })
            if(!findUser) return res.status(404).send('No user found');
            return res.status(200).json({ msg: findUser.firstName, email: findUser.email })
        } catch(err){
            return catchError(err, res);
        }
    }

    static async showProfile(req, res) {
        const ID = req.user.id;
        try{
            const findProfile = await Profile.findOne({ userID: ID });
            if(!findProfile) return res.status(404).send('Not found');
            return res.status(200).json({ findProfile });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async createProfile(req, res) {
        const data = matchedData(req);
        const ID = req.user.id;
        try{
            const newProfile = await Profile.create({...data, userID: ID });
            return res.status(200).json({ msg: 'Profile created', details: newProfile });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async patchProfile(req, res) {
        const data = matchedData(req);
        const ID = req.user.id;
        try{
            const updatedProfile = await Profile.findOneAndUpdate({ userID: ID }, data, { new: true });
            return res.status(200).json({ msg: 'Profile updated', details: updatedProfile })
        } catch(err){
            return catchError(err, res);
        }
    }

    static async showHistoric(req, res) {
        const ID = req.user.id;
        try{
            const showPurchases = await Purchase.find({ userID: ID });
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
            return res.status(200).json({historic});
        } catch(err){
            return catchError(err, res);
        }
    }
}