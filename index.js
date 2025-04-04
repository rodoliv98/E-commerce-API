import MongoStore from 'connect-mongo';
import express from 'express'
import session from 'express-session';
import cors from 'cors'
import mongoose from 'mongoose';
import passport from 'passport';
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js'
import logoutRoutes from './routes/logout.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cart.js'
import usersRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import 'dotenv/config'
//import { client } from './controllers/productController.js'

const app = express();
//app.set('trust proxy', true);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

/* const corsOptions = {
    origin: 'https://ecommerce-front-sand-nine.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200
}; */

app.use(express.json());

app.use(express.static('./public'));

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err.message))

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
        //sameSite: 'none',
        //secure: true,
        //path: '/'
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    })
}))

app.use(cors(corsOptions))

app.use(passport.initialize())
app.use(passport.session())

app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/logout', logoutRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/user', usersRoutes)
app.use('/admin', adminRoutes)

app.listen(3000, () => console.log('Server running on localhost:3000/'));

/*const start = async () => {
    await client.connect();
    app.listen(3000, () => console.log('Server running on localhost:3000/'));
}

start()*/