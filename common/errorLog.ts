import winston from "winston";

const errorLog = new winston.Logger({
  level: "error",
  transports: [new winston.transports.File({ filename: "error.log" })],
});

export default errorLog;
