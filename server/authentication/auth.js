require("dotenv").config();
var jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(401).json("token not found");
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = user.email;
      next();
    } catch (error) {
      res.status(401).json("invalid token");
    }
  },

  authAdmin: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      res.status(401).json("token not found");
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = user.email;
      next();
    } catch (error) {
      res.status(401).json("invalid token");
    }
  }
};
