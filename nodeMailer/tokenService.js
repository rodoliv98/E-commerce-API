import jwt from 'jsonwebtoken'

export const generateEmailToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const verifyEmailToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}