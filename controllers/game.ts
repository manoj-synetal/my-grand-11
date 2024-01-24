import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import deleteFile from "../common/deleteFile";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const BASEURL = process.env.BASEURL;

// @desc : game list
// @path : /game/list
export const gameList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const result = await prisma.game.findMany();
    // success respond
    successHandler(res, {
      message: "Fetch game list success.",
      imageUrl: `${BASEURL}uploads/game/`,
      data: result,
    });
  }
);

// @desc : create game
// @path : /game/create
export const createGame = expressAsyncHandler(
  async (req: any, res: Response) => {
    const { name, adRewardCoins } = req.body;
    const imageFile = req.files?.image?.[0]?.filename;
    const bannerFile = req.files?.banner?.[0]?.filename;
    const findGame = await prisma.game.findUnique({
      where: { name: name },
    });

    // if game already exist with game name
    if (findGame) {
      res.status(400);
      throw new Error(
        `Game already exist in database with this ${name} gameName.`
      );
    }

    // throw error & delete file
    if (!name || !adRewardCoins || !imageFile || !bannerFile) {
      imageFile && deleteFile(`/game/${imageFile}`);
      bannerFile && deleteFile(`/game/${bannerFile}`);

      res.status(400);
      throw new Error("Please fill all fields.");
    }

    // create game
    const result = await prisma.game.create({
      data: {
        name: name,
        adRewardCoins: Number(adRewardCoins),
        image: imageFile,
        banner: bannerFile,
      },
    });

    // success respond
    successHandler(res, {
      message: "Create game success",
      imageUrl: `${BASEURL}uploads/game/`,
      data: result,
    });
  }
);

// @desc : update game
// @path : /game/update
export const updateGame = expressAsyncHandler(
  async (req: any, res: Response) => {
    const { name, adRewardCoins, gameId } = req.body;
    const imageFile = req.files?.image?.[0]?.filename;
    const bannerFile = req.files?.banner?.[0]?.filename;
    const findGame = await prisma.game.findUnique({
      where: { id: Number(gameId) },
    });

    // if invalid game id
    if (!findGame) {
      res.status(400);
      throw new Error(
        `Game doesn't exist in database with this ${gameId} gameId.`
      );
    }

    // delete previous file if added new file
    imageFile && deleteFile(`/game/${findGame.image}`);
    bannerFile && deleteFile(`/game/${findGame.banner}`);

    // update game
    const result = await prisma.game.update({
      where: { id: Number(gameId) },
      data: {
        name: name ? name : findGame.name,
        adRewardCoins: adRewardCoins
          ? Number(adRewardCoins)
          : findGame.adRewardCoins,
        image: imageFile ? imageFile : findGame.image,
        banner: bannerFile ? bannerFile : findGame.banner,
      },
    });

    // success respond
    successHandler(res, {
      message: "Update game success",
      imageUrl: `${BASEURL}uploads/game/`,
      data: result,
    });
  }
);

// @desc : update game status
// @path : /game/update-status
export const updateGameStatus = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { status, gameId } = req.body;
    const findGame = await prisma.game.findUnique({
      where: { id: Number(gameId) },
    });

    // if invalid game id
    if (!findGame) {
      res.status(400);
      throw new Error(
        `Game doesn't exist in database with this ${gameId} gameId.`
      );
    }

    // update game status
    const result = await prisma.game.update({
      where: { id: Number(gameId) },
      data: { status: status },
    });

    // success respond
    successHandler(res, {
      message: "Update game success",
      imageUrl: `${BASEURL}uploads/game/`,
      data: result,
    });
  }
);

// @desc : delete game
// @path : /game/delete
export const deleteGame = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { gameId } = req.params;
    const findGame = await prisma.game.findUnique({
      where: { id: Number(gameId) },
    });

    // if invalid game id
    if (!findGame) {
      res.status(400);
      throw new Error(
        `Game doesn't exist in database with this ${gameId} gameId.`
      );
    }

    // delete previous file if added new file
    deleteFile(`/game/${findGame.image}`);
    deleteFile(`/game/${findGame.banner}`);

    // update game
    const result = await prisma.game.delete({ where: { id: Number(gameId) } });

    // success respond
    successHandler(res, { message: "Delete game success", data: result });
  }
);
