import { Router } from "express";
const gameRoute = Router();
import { adminValiateToken } from "../common/validateToken";
import {
  createGame,
  gameList,
  updateGame,
  updateGameStatus,
  deleteGame,
} from "../controllers/game";
import { uploadGame } from "../common/fileUpload";

gameRoute.post(
  "/create",
  adminValiateToken,
  uploadGame.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  createGame
); // create game
gameRoute.patch(
  "/update",
  adminValiateToken,
  uploadGame.fields([
    { name: "image", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateGame
); // update game
gameRoute.get("/list", gameList); // game list
gameRoute.delete("/delete/:gameId", adminValiateToken, deleteGame); // delete game
gameRoute.patch("/update-status", adminValiateToken, updateGameStatus); // update status

export default gameRoute;
