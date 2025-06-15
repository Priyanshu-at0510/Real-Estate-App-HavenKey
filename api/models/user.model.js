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
    },
    avatar:{
        type:String,
        default:"https://imgs.search.brave.com/Vhx9ztJ8zy3-GQhynXeSiq4tQizwKLO_Jsvr2o8Qdq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/MzY3MTM5Mi92ZWN0/b3IvZGVmYXVsdC1w/cm9maWxlLXBpY3R1/cmUtYXZhdGFyLXBo/b3RvLXBsYWNlaG9s/ZGVyLXZlY3Rvci1p/bGx1c3RyYXRpb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXMwYVRkbVQ1YVU2/YjhvdDdWS20xMURl/SUQ2TmN0UkNwQjc1/NXJBMUJJUDA9"
    }
},{timestamps:true} //it will save the time of creation and when it is getting updated
);

const User=mongoose.model("User",userSchema);

export default User;