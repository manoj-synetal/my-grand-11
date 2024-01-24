import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

// User Token Validation
const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
      const findUser = await prisma.user.findUnique({
        where: { id: Number(decoded.id) },
      });

      if (!findUser) {
        res.status(401).json({
          error: true,
          success: false,
          status: 401,
          message: "Invalid token.",
        });
      } else {
        req.user = findUser;
        next();
      }
    });
  } else {
    res.status(400);
    throw new Error("Please enter token.");
  }
};

// Admin Token Validation
export const adminValiateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
      const findAdmin = await prisma.admin.findUnique({
        where: { id: Number(decoded.id) },
      });

      if (!findAdmin) {
        res.status(401).json({
          error: true,
          success: false,
          status: 401,
          message: "Invalid token.",
        });
      } else {
        req.admin = findAdmin;
        next();
      }
    });
  } else {
    res.status(400);
    throw new Error("Please enter token.");
  }
};

export default validateToken;
