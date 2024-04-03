import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from "cors"
import authRoute from './services/routes/auth.js'
import hotelRoute from './services/routes/hotels.js'
import userRoute from './services/routes/rooms.js'
import roomRoute from './services/routes/users.js'


const app = express();
dotenv.config({ path: '.env' });


const connect = async () => {
    try {
        await mongoose.connect(process.env.urlDB);
        console.log("Connected To DataBase");
    } catch (error) {
        throw error
    }
}

// middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/users', userRoute)
app.use('/api/rooms', roomRoute)

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || "someThing went wrong";

    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.stack
    })
})



app.listen(process.env.PORT, () => {
    connect();
    console.log("app is connected backend....");
})