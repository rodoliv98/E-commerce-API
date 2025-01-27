import { Purchase } from "../mongooseSchemas/mongooseCreatePurchase.js";

export const showHistoric = async (req, res) => {
    if(!req.user) return res.status(401).send('Please login');
    const ID = req.session.passport;
    try{
        const showBuys = await Purchase.find({ userID: ID.user });
        if(showBuys.length === 0) return res.status(404).send('No historic');
        return res.status(200).json({ historic: showBuys });
    } catch(err){
        console.error(err);
        return res.status(500).json({ msg: 'Internal server error', details: err.message });
    }
}