import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CRICKET_API } from "../cricket/interceptor";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";
import {
  current_matches_endpoint,
  matches_endpoint,
  players_endpoint,
  players_info_endpoint,
  series_endpoint,
} from "../cricket/endpoints";

const prisma = new PrismaClient();

// @desc : players list
// @path : /cricket/players
export const playersList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result = await CRICKET_API.get(players_endpoint);

      // success respond
      successHandler(res, {
        message: "Fetch players list.",
        result: result.data,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong.");
    }
  }
);

// @desc : players info
// @path : /cricket/player_info/:playerId
export const playerInfo = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { playerId } = req.params;
    try {
      const result = await CRICKET_API.get(
        `${players_info_endpoint}?id=${playerId}`
      );

      // success respond
      successHandler(res, {
        message: "Fetch player info.",
        result: result.data,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong.");
    }
  }
);

// @desc : series list
// @path : /cricket/series
export const cricketSeriesList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result = await CRICKET_API.get(series_endpoint);

      // success respond
      successHandler(res, {
        message: "Fetch series list.",
        result: result.data,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong.");
    }
  }
);

// @desc : series list
// @path : /cricket/series
export const matchesList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result = await CRICKET_API.get(matches_endpoint);

      // success respond
      successHandler(res, {
        message: "Fetch matches list.",
        result: result.data,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong.");
    }
  }
);

// @desc : series list
// @path : /cricket/series
export const currentMatchesList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result = await CRICKET_API.get(current_matches_endpoint);
      // success respond
      successHandler(res, {
        message: "Fetch current matches list.",
        result: result.data,
      });
    } catch (error) {
      res.status(400);
      throw new Error("Something went wrong.");
    }
  }
);
