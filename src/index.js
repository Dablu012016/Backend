// require('dotenv').config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
});

connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
        
    })
}).catch((error) => {
    console.log("MongoDb connection failed !!!", error);
    
})




// SECOND APPROACH:-

// import mongoose from "mongoose";
// import {DB_NAME} from "./constants"

// import express from "express"
// const app = express();

// ( async() => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` ); 

//       app.on("error", (error) => {
//         console.log("ERRR:", error);
//         throw err       
//       });

//       app.listen(process.env.PORT, () => {
//         console.log(`App listening on port ${process.env.PORT}`);
        
//       })
//     } catch (error) {
//         console.log("ERROR: ", error);
//         throw err
//     }
// }) ()