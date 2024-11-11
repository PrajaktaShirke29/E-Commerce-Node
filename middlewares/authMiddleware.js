import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

function authMiddleware(req, res, next) {
  const token = getTokenFromHeader(req);
  // try {
  // console.log(token, req?.header)
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error("Invalid/Expired token");
  } else {
    req.userAuthId = decodedUser.id;
    next();
  }
  // } catch (error) {
  //   res.status(401).json({ error: "Invalid token" });
  // }
}

export default authMiddleware;
