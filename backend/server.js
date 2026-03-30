import express from 'express'; // This is the Modular Approach
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cart.js';
import AddressRoutes from './routes/address.js';
import orderRoutes from './routes/order.js';

dotenv.config(); // Beacuse we have to connect with .env

const app = express();

app.use(cors()); // Beacase we have connect our frontend easily connect with backend with help of Cors without any issue

app.use(express.json()); // Beacuse we have used json file for creating API 

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', AddressRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
    res.send("API is running...");
});

connectDB();

app.listen(5000, () => {
    console.log('API is Running on 5000');
});