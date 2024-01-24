import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc : team list by user
// @path : /team/list-by-user
export const teamListByUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await prisma.team.findMany({ where: { userId: id } });
    // success respond
    successHandler(res, {
      message: "Fetch team list by user success.",
      data: result,
    });
  }
);
