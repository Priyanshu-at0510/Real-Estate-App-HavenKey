import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
       type:String,
       required:true,
       unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true} //it will save the time of creation and when it is getting updated
);

const User=mongoose.model("User",userSchema);

export default User;