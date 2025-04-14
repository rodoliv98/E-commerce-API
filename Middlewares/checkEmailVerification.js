import { matchedData } from "express-validator";
import { User } from "../mongooseSchemas/mongooseCreateUser.js";
import { reSendEmailToken } from "../utils/utilFunctions.js";

export const checkEmail = async (req, res, next) => {
    const data = matchedData(req);

    const user = await User.findOne({ email: data.email });
    if(user.emailVerified === false){
        await reSendEmailToken(user._id, user.email);
        return res.status(400).send('Please verify your email');
    }

    next();
} 