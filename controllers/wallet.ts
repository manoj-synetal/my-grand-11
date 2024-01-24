import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc : add money to wallet
// @path : /wallet/add-money
export const addMoney = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const { amount } = req.body;
    const result = await prisma.wallet.update({
      where: { userId: id },
      data: { balance: { increment: amount } },
    });
    await prisma.adminWallet.update({
      where: { adminId: 1 },
      data: { balance: { increment: amount } },
    });
    // create transaction history
    await prisma.transaction.create({
      data: {
        userId: id,
        amount: Number(amount),
        txnId: `${Math.floor(Math.random() * Date.now())}`,
        txnType: "credit",
        txnStatus: "SUCCESS",
        txnName: "WALLET",
        txnDesc: `added ${amount} rupay in your wallet`,
      },
    });
    // success respond
    successHandler(res, { message: "added money to your wallet", result });
  }
);
