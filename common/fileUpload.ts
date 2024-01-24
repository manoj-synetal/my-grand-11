import path from "path";
import multer from "multer";
import { Request } from "express";
type DestinationCallback = (error: Error | null, destination: string) => void;

// user avatar file
const avatarStorage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, path.join(__dirname, "../uploads/avatar"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2mb file size
  fileFilter: (req, file, cb) => {
    const allowedFormats = [".jpg", ".jpeg", ".png", ".webp"]; // Add more formats if needed
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFormats.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"));
    }
  },
});

// create game image & banner
const gameStorage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    cb(null, path.join(__dirname, "../uploads/game"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});
export const uploadGame = multer({
  storage: gameStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2mb file size
  fileFilter: (req, file, cb) => {
    const allowedFormats = [".jpg", ".jpeg", ".png", ".webp"]; // Add more formats if needed
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFormats.includes(extname)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"));
    }
  },
});
