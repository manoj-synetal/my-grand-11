import { Router } from "express";
import { transactionList } from "../controllers/transaction";
import { adminValiateToken } from "../common/validateToken";
const transactionRoute = Router();

transactionRoute.get("/list", adminValiateToken, transactionList);

export default transactionRoute;
