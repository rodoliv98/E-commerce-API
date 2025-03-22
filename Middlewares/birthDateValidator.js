import { matchedData } from "express-validator";

function ageValidator(req, res, next){
    const data = matchedData(req);

    const [day, month, year] = data.birthDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if(date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year){
        return res.status(400).send('Invalid date');
    }

    next();
}

export default ageValidator;