import express from "express"
import mongoose, { Mongoose } from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

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
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

//this is a global middleware
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode || 500;
  const message=err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
});


