import express from "express"
import mongoose, { Mongoose } from "mongoose"
import dotenv from "dotenv";
dotenv.config();
console.log("mongoDb URL",process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" MongoDB server Connected successfully"))
.catch((err) => console.error("MongoDB Connection Error:", err));

const app=express();

const PORT=3000;

app.listen(PORT,()=>{
    console.log(`server started at PORT : ${PORT} !!! `);
});

