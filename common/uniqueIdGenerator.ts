const uniqueIdGenerator = (purpose: string) => {
  // number length
  const numLength = () => {
    switch (purpose) {
      case "referalId":
        return 7;

      default:
        return 7;
    }
  };
  const length = numLength();
  const characters =
    purpose === "referalId"
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      : "0123456789";
  let generatedId = "";

  // create
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    generatedId += characters.charAt(randomIndex);
  }

  // return id
  return generatedId;
};
export default uniqueIdGenerator;
