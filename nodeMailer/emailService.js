import nodeMailer from 'nodemailer'
import 'dotenv/config'


const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendVerificationEmail = async (userEmail, token) => {
    const verificationLink = `https://ecommerce-front-sand-nine.vercel.app/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Confirm your email`,
        html: `<p>Click to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    })
}

export const sendPasswordRecoveryEmail = async (userEmail, token) => {
    const verificationLink = `https://ecommerce-front-sand-nine.vercel.app/change-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Password recovery`,
        html: `<p>Click to change to a new password: <a href="${verificationLink}">${verificationLink}</a></p>`,
    })
}