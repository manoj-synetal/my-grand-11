import { Router } from "express";
import { addMoney } from "../controllers/wallet";
import validateToken from "../common/validateToken";
const walletRoute = Router();

walletRoute.post("/add-money", validateToken, addMoney);

export default walletRoute;
