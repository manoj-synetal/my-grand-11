import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const BASEURL = process.env.BASEURL;

// @desc : user profile
// @path : /user/profile
export const profile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { wallet: true },
    });
    // success respond
    successHandler(res, {
      message: "User profile success.",
      imageUrl: `${BASEURL}uploads/avatar/`,
      data: findUser,
    });
  }
);

// @desc : user profile
// @path : /user/profile
export const updateProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const { name, email } = req.body;
    // update profile
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: { name: name, email: email, avatar: req?.file?.filename },
    });
    successHandler(res, { message: "Profile updated success", data: result }); // success respond
  }
);

// @desc : apply referal
// @path : /user/apply-referal
export const applyReferal = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data = req.user;
    const { referalId } = req.body;
    // await prisma.appsetting.findUnique({
    //   where: { appId: 0 },
    // });
    const referalAmount = 50; // will be dynamic and managed by admin

    // findUser
    const findUser = await prisma.user.findUnique({ where: { referalId } });

    // throw error if referal id is invalid
    if (!findUser) {
      res.status(400);
      throw new Error("Please enter valid referal id");
    }
    const walletFound = await prisma.wallet.findUnique({
      where: { userId: findUser.id },
    });
    // update user with refer by id
    const result = await prisma.user.update({
      where: { referalId: data.referalId },
      data: { referBy: referalId },
    });

    // update wallet
    walletFound &&
      (await prisma.wallet.update({
        where: { userId: findUser.id },
        data: {
          balance: walletFound.balance + referalAmount,
          referalIncome: walletFound.referalIncome + referalAmount,
        },
      }));

    // create transaction history
    await prisma.transaction.create({
      data: {
        userId: findUser.id,
        amount: referalAmount,
        txnId: `${Math.floor(Math.random() * Date.now())}`,
        txnType: "credit",
        txnStatus: "SUCCESS",
        txnName: "WALLET",
        txnDesc: `got refered income from ${data.name}`,
      },
    });

    // success respond
    successHandler(res, { message: "referal applied success", data: result });
  }
);

// @desc : user list
// @path : /user/list
export const list = expressAsyncHandler(async (req: Request, res: Response) => {
  const result = await prisma.user.findMany({ include: { wallet: true } });
  // success respond
  successHandler(res, {
    message: "Fetch user list success.",
    imageUrl: `${BASEURL}uploads/avatar/`,
    data: result,
  });
});
