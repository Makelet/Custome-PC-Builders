import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import connectDB from './config/db.js'
import path from 'path';
dotenv.config();
connectDB();
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user', userRoutes);

app.use('/allproducts', productsRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))