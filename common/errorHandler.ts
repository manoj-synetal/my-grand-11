import errorLog from "./errorLog";

const errorHandler = (err: any, req: any, res: any, next: any) => {
  // errors logger
  errorLog.log("error", err.message.replace("Error: ", ""), "my string");
  res.json({
    error: true,
    success: false,
    responseStatus: 0,
    status: res.statusCode ? res.statusCode : 500,
    message: err.message,
  });
};

export default errorHandler;
