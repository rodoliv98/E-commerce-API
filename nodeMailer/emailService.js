import nodeMailer from 'nodemailer'
import 'dotenv/config'


const transporter = nodeMailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendVerificationEmail = async (userEmail, token) => {
    const verificationLink = `http://localhost:3000/register/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `Confirm your email`,
        html: `<p>Click to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
    })
}