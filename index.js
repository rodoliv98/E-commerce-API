import MongoStore from 'connect-mongo';
import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import loginRoutes from './routes/login.js'

const app = express();

app.use(express.json());
mongoose.connect("mongodb+srv://rdgoliv18:NuPuTOJD5V22VaW3@users.oybab.mongodb.net/users?retryWrites=true&w=majority&appName=users")
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err))
app.use(session({
    secret: "c53890169c8a100d6b7f24e8cd059f63db0794f9586e96e82ddfef08f026cd6d",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', loginRoutes)


app.listen(3000, () => console.log('Server running on localhost:3000/'));