import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc : transaction list by user
// @path : /user/transaction-by-user
export const transactionListByUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await prisma.transaction.findMany({ where: { userId: id } });
    // success respond
    successHandler(res, {
      message: "Fetch transaction list by user success.",
      data: result,
    });
  }
);

// @desc : transaction list by user
// @path : /transaction/list
export const transactionList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const result = await prisma.transaction.findMany();
    // success respond
    successHandler(res, {
      message: "Fetch transaction list success.",
      data: result,
    });
  }
);
