import { Router } from "express";
const userRoute = Router();

import validateToken from "../common/validateToken";
import {
  applyReferal,
  list,
  profile,
  updateProfile,
} from "../controllers/user";
import { uploadAvatar } from "../common/fileUpload";
import { transactionListByUser } from "../controllers/transaction";

userRoute.put(
  "/profile",
  validateToken,
  uploadAvatar.single("avatar"),
  updateProfile
); // profile update
userRoute.get("/list", list); // user list
userRoute.get("/profile", validateToken, profile); // fetch user profile
userRoute.post("/apply-referal", validateToken, applyReferal); // apply referal id
userRoute.get("/transaction-by-user", validateToken, transactionListByUser); // fetch user's transactions

export default userRoute;
