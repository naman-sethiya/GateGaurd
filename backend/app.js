import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import registerRouter from './routes/registerRoutes.js';
import homeRouter from './routes/homeRoutes.js';

const app=express();
dotenv.config();

//Connecting to Database
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log(err);
})



const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/register",registerRouter)
app.use("/api/home",homeRouter)


