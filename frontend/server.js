const express = require('express');
const cors= require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB=require('./config/db');
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
const PORT=process.env.PORT || 12345;
const usersRouter = require("./routes/userRoutes");

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to My localhost 12345"
    });
});

app.use("/user", usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white);
});