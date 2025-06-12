import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

import { configDotenv } from "dotenv";

export const signup= async (req,res,next)=>{
        //body se data nikaalo
        const {userName,email,password} = req.body;
        //validate the data 
        if(!userName || !email || !password){
            res.status(404).json({
                success:false,
                message:"All fields required !!!"
            });
        }
        //hash the password
        const hashedPassword =await bcryptjs.hash(password,12);
        const newUser=new User({userName,email,password:hashedPassword});
        //save the password
        try{
            await newUser.save();
            res.status(201).json({
                newUser,
                success:true,
                message:"Entry created for new User",
            });
        } catch (error) {
            next(error);
        }
  
};

export const signin=async (req,res,next)=>{
    //body se data nikaalo
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        //validate it
        if(!validUser)return next(errorHandler(404,"User not found"));
        //now check the password is matched or not 
        const validPassword=await bcryptjs.compare(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Invalid Credentials"));
        //generate the token
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'3d'});
        const {password:pass, ...rest}=validUser._doc; //to hide the password from response
        res.cookie("access_token",token ,{httpOnly:true}).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};