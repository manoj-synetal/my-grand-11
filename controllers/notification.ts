import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import successHandler from "../common/successHandler";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();

// @desc : notification list by user
// @path : /notification/list-by-user
export const notificationListByUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const result1 = await prisma.notification.findMany({
      where: { receiverId: id },
    });
    const result2 = await prisma.notification.findMany({
      where: { receiverId: null },
    });
    // success respond
    successHandler(res, {
      message: "Fetch notification list by user success.",
      data: [...result1, ...result2],
    });
  }
);

// @desc : notification list by admin
// @path : /notification/list
export const notificationList = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const result = await prisma.notification.findMany();
    // success respond
    successHandler(res, {
      message: "Fetch notification list success.",
      data: result,
    });
  }
);

// @desc : notification list by user
// @path : /notification/push
export const notificationPush = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { title, body } = req.body;
    const result = await prisma.notification.create({
      data: { title, body },
    });
    // success respond
    successHandler(res, {
      message: "notification pushed success.",
      data: result,
    });
  }
);
