import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const tokon = req.cookies.access_tokon;

  if (!tokon) return next(errorHandler(401, "you are not authenticated"));

  jwt.verify(tokon, process.env.KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "invalid tokon"));
    }
    req.user = user;
    next();
  });
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
