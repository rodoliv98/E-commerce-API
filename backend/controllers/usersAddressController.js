import { matchedData } from "express-validator"
import { Address } from '../mongooseSchemas/mongooseCreateUserAdress.js'

export const showAddresses = async (req, res) => {
    const ID = req.user.id;
    try{
        const addresses = await Address.find({ userID: ID });
        if(!addresses) return res.status(404).send('You have no addresses saved');
        return res.status(200).json(addresses);
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message })
    }
}

export const createAddress = async (req, res) => {
    const data = matchedData(req);
    const ID = req.user.id;
    try{
        const newAddress = new Address({ ...data, userID: ID });
        await newAddress.save();
        return res.status(200).json({ msg: 'New address saved', details: newAddress })
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message })
    }
}

export const patchAddress = async (req, res) => {
    const data = matchedData(req);
    const ID = req.user.id;
    try{
        const address = await Address.findOneAndUpdate({ userID: ID }, data, { new: true } );
        if(!address) return res.status(404).send('Address not found');
        return res.status(200).json({ msg: 'Address updated!', address });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message })
    }
}

export const deleteAddress = async (req, res) => {
    const { id } = req.params;
    const ID = req.user.id;
    try{
        const address = await Address.findOneAndDelete({ _id: id });
        if(!address) return res.status(404).send('Address not found');
        return res.status(200).json({ msg: 'Address deleted!', address });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message })
    }
}