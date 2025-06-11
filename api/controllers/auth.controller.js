import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup= async (req,res,next)=>{
        //body se data nikaalo
        const {userName,email,password} = req.body;
        //validate the data 
        if(!userName && !email && !password){
            res.status(404).json({
                success:false,
                message:"All fields required"
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
  
}