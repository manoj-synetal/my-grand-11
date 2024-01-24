import { Router } from "express";
import {
  notificationList,
  notificationListByUser,
  notificationPush,
} from "../controllers/notification";
import validateToken, { adminValiateToken } from "../common/validateToken";
const notificationRoute = Router();

// User Routes
notificationRoute.get("/list", adminValiateToken, notificationList); // notification list by admin
notificationRoute.post("/push", adminValiateToken, notificationPush); // notification push by admin
notificationRoute.get("/list-by-user", validateToken, notificationListByUser); // notification list by user

export default notificationRoute;
