import { validationResult } from "express-validator";

function bodyValidator(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage = errors.array().map(error => error.msg);
        return res.status(400).json({ errorMessage });
    }
    next();
}

export default bodyValidator