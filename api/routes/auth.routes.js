import express from "express";
//get the router instance
const router=express.Router();

//get the controllers
import { signup } from "../controllers/auth.controller.js";

//create the route

router.post("/signup",signup);

export default router;
