import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
}

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123") as JwtPayload;

      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Немає доступу",
      });
    }
  } else {
    return res.status(403).json({
      message: "Немає доступу",
    });
  }
};
