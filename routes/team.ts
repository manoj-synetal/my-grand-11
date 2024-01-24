import { Router } from "express";
import validateToken from "../common/validateToken";
import { teamListByUser } from "../controllers/team";
const teamRoute = Router();

teamRoute.get("/list-by-user", validateToken, teamListByUser);

export default teamRoute;
