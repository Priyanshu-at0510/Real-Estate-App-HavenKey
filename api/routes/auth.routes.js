import express from "express";
//get the router instance
const router=express.Router();

//get the controllers
import { signup } from "../controllers/auth.controller.js";
import { signin } from "../controllers/auth.controller.js";
//create the route

router.post("/signup",signup);
router.post("/signin",signin);

export default router;
