import { Router } from "express";
const circketRoute = Router();
import {
  cricketSeriesList,
  playerInfo,
  playersList,
  matchesList,
  currentMatchesList,
} from "../controllers/cricketData";

circketRoute.get("/players", playersList); // players list
circketRoute.get("/matches", matchesList); // matches list
circketRoute.get("/series", cricketSeriesList); // cricket serie list
circketRoute.get("/player_info/:playerId", playerInfo); // player info
circketRoute.get("/currentMatches", currentMatchesList); // current matches list

export default circketRoute;
