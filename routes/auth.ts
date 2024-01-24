import { Router } from "express";
const authRoute = Router();
import { adminLogin, adminRegister, register } from "../controllers/auth";

// User Routes
authRoute.post("/register", register); // user register & login

// Admin Routes
authRoute.post("/admin-login", adminLogin); // admin login
authRoute.post("/admin-register", adminRegister); // admin register

export default authRoute;
