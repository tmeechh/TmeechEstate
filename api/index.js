import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})