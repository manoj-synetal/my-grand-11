import CryptoJS from "crypto-js";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import expressAsyncHandler from "express-async-handler";

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const BASEURL = process.env.BASEURL;
const jwt_secret = process.env.JWT_SECRET;
const crypto_secret = process.env.CRYPTO_SECRET;
import generateOTP from "../common/generateOTP";
import successHandler from "../common/successHandler";
import uniqueIdGenerator from "../common/uniqueIdGenerator";

// @desc : user register & login in one api based on response status
// #flow : mobile --> otp --> userExist ? Home Screen : Form Screen
// @path : /auth/register
export const register = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { phone, otp, responseStatus, name } = req.body;

    // if phone is missed
    if (!phone) {
      res.status(400);
      throw new Error("Please enter mobile number.");
    }

    // if user not registered
    if (responseStatus == 3) {
      const referalId = uniqueIdGenerator("referalId");
      const result = await prisma.user.create({
        data: { phone, name, referalId },
      }); // create user
      await prisma.wallet.create({ data: { userId: result.id } }); // create user wallet
      const token = jwt.sign({ id: result.id }, jwt_secret);
      successHandler(res, {
        message: "User register success",
        data: result,
        accessToken: token,
      }); // success respond after register
    }

    // if user registered & otp verify
    else {
      if (responseStatus == 2) {
        // await prisma.otp.deleteMany({ where: { phone: phone } });
        const findOtp = await prisma.otp.findUnique({
          where: { phone: phone },
        });

        if (findOtp?.otp !== otp) {
          res.status(400);
          throw new Error("Please enter valid otp.");
        } else {
          // find user data
          const findUser = await prisma.user.findUnique({ where: { phone } });
          await prisma.otp.deleteMany({ where: { phone: phone, otp: otp } }); // delete otp after validate

          // success respond after validate
          findUser
            ? successHandler(res, {
                responseStatus: 1,
                message: "User logged in success",
                data: findUser,
                token: jwt.sign({ id: findUser.id }, jwt_secret),
              })
            : successHandler(res, {
                responseStatus: 3,
                message: "Otp verified success",
              });
        }
      } else {
        const value = generateOTP(); // generate otp
        await prisma.otp.deleteMany({ where: { phone } });
        await prisma.otp.create({ data: { phone, otp: value } }); // create otp to validate
        successHandler(res, {
          responseStatus: 2,
          message: "Otp sent on your mobile.",
          OTP: value,
        }); // success respond with otp
      }
    }
  }
);

// --------------------------------- Admin Auth -------------------------------- //

// @desc : admin registration
// @path : /auth/admin-register
export const adminRegister = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    // if email and password is missed
    if (!email || !password || !name) {
      res.status(400);
      throw new Error("Please fill all fields.");
    }

    // find admin
    const findAdmin = await prisma.admin.findUnique({
      where: { email: email },
    });

    // if invalid email
    if (findAdmin) {
      res.status(400);
      throw new Error("Wrong credentials.");
    }

    var securePassword = CryptoJS.AES.encrypt(
      password,
      `${crypto_secret}`
    ).toString();

    // create admin
    const result = await prisma.admin.create({
      data: { name, email, password: securePassword },
    });
    await prisma.adminWallet.create({ data: { adminId: result.id } }); // create admin

    // success respond
    successHandler(res, {
      message: "Admin register success",
      data: result,
    });
  }
);

// @desc : admin login
// @path : /auth/admin-login
export const adminLogin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // if email and password is missed
    if (!email || !password) {
      res.status(400);
      throw new Error("Please enter mobile number.");
    }

    // find admin
    const findAdmin = await prisma.admin.findUnique({
      where: { email: email },
    });

    // if invalid email
    if (!findAdmin) {
      res.status(400);
      throw new Error("Wrong credentials.");
    }

    // decrypt password
    var decryptPassword = CryptoJS.AES.decrypt(
      `${findAdmin?.password}`,
      `${crypto_secret}`
    ).toString(CryptoJS.enc.Utf8);

    if (decryptPassword === password) {
      const token = jwt.sign({ id: findAdmin.id }, jwt_secret);
      successHandler(res, {
        message: "Admin logged in success",
        accessToken: token,
        data: findAdmin,
      }); // success respond after validate
    } else {
      res.status(400);
      throw new Error("Wrong password.");
    }
  }
);

// @desc : admin profile
// @path : /admin/profile
export const adminProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.admin;
    const findAdmin = await prisma.admin.findUnique({
      where: { id: Number(id) },
      include: { wallet: true },
    });
    // success respond
    successHandler(res, {
      message: "User profile success.",
      imageUrl: `${BASEURL}uploads/avatar/`,
      data: findAdmin,
    });
  }
);
