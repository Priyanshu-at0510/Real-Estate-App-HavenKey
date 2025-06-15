import express from "express";
//get the router instance
const router=express.Router();

//get the controllers
import { signup ,signin ,google} from "../controllers/auth.controller.js";

//create the route

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);

export default router;
