export const getTokenFromHeader = (req) => {
  const token = req?.headers?.["authorization"]?.split(" ")[1];
  if (!token) return "No Token";
  else {
    return token;
  }
};
