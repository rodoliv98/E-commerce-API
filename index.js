import MongoStore from 'connect-mongo';
import express from 'express'
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cart.js'
import historicRoutes from './routes/historic.js'
import 'dotenv/config'

const app = express();

const MONGO_URI = process.env.MONGO_URI
const SESSION_SECRET = process.env.SESSION_SECRET

app.use(express.json());
mongoose.connect(MONGO_URI)
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err.message))
app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/historic', historicRoutes)


app.listen(3000, () => console.log('Server running on localhost:3000/'));