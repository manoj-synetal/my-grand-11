import cors from "cors";
require("dotenv/config");
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

import authRoute from "../routes/auth";
import userRoute from "../routes/user";
import gameRoute from "../routes/game";
import circketRoute from "../routes/cricket";
import errorHandler from "../common/errorHandler";
import { adminProfile } from "../controllers/auth";
import transactionRoute from "../routes/transaction";
import notificationRoute from "../routes/notification";
import { adminValiateToken } from "../common/validateToken";
import walletRoute from "../routes/wallet";
import teamRoute from "../routes/team";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/team", teamRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/game", gameRoute);
app.use("/wallet", walletRoute);
app.use("/cricket", circketRoute);
app.use("/transaction", transactionRoute);
app.use("/notification", notificationRoute);

// admin profile
app.get("/admin/profile", adminValiateToken, adminProfile);

// home api
app.get("/", (req, res) => {
  res.send("Hey! My Grand 11 Backend Started 🎉🎉");
});

// error handler
app.use(errorHandler);

// server started
app.listen(PORT, () =>
  console.log(`
🚀 Server ready at: http://localhost:${PORT}`)
);
