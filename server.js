import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import doctorRouter from './routes/doctorRouter.js';
import adminRouter from './routes/adminRouter.js';
import hospitalRouter from './routes/hospitalRouter.js'
import cors from 'cors';

const app = express();
dotenv.config();

app.use(express.json());

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://doc-care-eight.vercel.app/",
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
}));

app.use("/user/api", userRouter);
app.use("/user/api", doctorRouter);
app.use("/user/api", hospitalRouter);
app.use('/admin/api', adminRouter);

// DB connecting

mongoose.connect(process.env.DB)
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log(error));

// Server Connecting

const PORT = process.env.PORT || 6789

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});