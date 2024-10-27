import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Database/dbconfiq.js'
import userRoute from './Routers/userAuthenticationRouter.js'


dotenv.config()

const app = express();

app.use(express.json());

app.use(cors());

connectDB();

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to USER AUTHENICATION API")
})

app.use("/api/auth",userRoute)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server is statred in our api and Running onthe port `);
    
})