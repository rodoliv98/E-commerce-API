import { matchedData } from "express-validator"
import { Address } from '../mongooseSchemas/mongooseCreateUserAdress.js'
import { catchError } from '../utils/utilFunctions.js'

export class UsersAddressController {
    static async showAddresses(req, res) {
        const ID = req.user.id;
        try{
            const addresses = await Address.find({ userID: ID });
            if(!addresses) return res.status(404).send('You have no addresses saved');
            return res.status(200).json(addresses);
        } catch(err){
            return catchError(err, res);
        }
    }   

    static async createAddress(req, res) {
        const data = matchedData(req);
        const ID = req.user.id;
        try{
            const newAddress = await Address.create({ ...data, userID: ID });
            return res.status(200).json({ msg: 'New address saved', details: newAddress })
        } catch(err){
            return catchError(err, res);
        }
    }

    static async patchAddress(req, res) {
        const data = matchedData(req);
        const ID = req.params.id;
        try{
            const address = await Address.findOneAndUpdate({ _id: ID }, data, { new: true } );
            if(!address) return res.status(404).send('Address not found');
            return res.status(200).json({ msg: 'Address updated!', address });
        } catch(err){
            return catchError(err, res);
        }
    }

    static async deleteAddress(req, res) {
        const ID = req.params.id;
        try{
            const address = await Address.findOneAndDelete({ _id: ID });
            if(!address) return res.status(404).send('Address not found');
            return res.status(200).json({ msg: 'Address deleted!', address });
        } catch(err){
            return catchError(err, res);
        }
    }
}