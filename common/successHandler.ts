const successHandler = (res: any, data: any) => {
  res.json({
    error: false,
    success: true,
    responseStatus: 1,
    ...data,
  });
};

export default successHandler;
