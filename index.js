import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import registerRoutes from './routes/register.js'
import loginRoutes from './routes/login.js'
import productRoutes from './routes/product.js'
import cartRoutes from './routes/cart.js'
import usersRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'
import statusRoutes from './routes/status.js'
import 'dotenv/config'

const app = express();

const corsOptions = {
    origin: process.env.PROD_URL,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.static('./public'));

mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err.message))

app.use(cors(corsOptions))

app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/user', usersRoutes)
app.use('/admin', adminRoutes)
app.use('/status', statusRoutes)

app.listen(3000, () => console.log('Server running'));