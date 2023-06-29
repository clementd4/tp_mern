require("dotenv").config();
var jwt = require("jsonwebtoken");

const model_users = require('../models/Users');

async function findUserByEmail(email) {
  try {
      return await model_users.find({ email: email });
  } catch (err) {
      console.log(err);
      return null;
  }
}

module.exports = {
  auth: (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json("token not found");
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (error) {
      res.status(401).json("invalid token");
    }
  },

  authAdmin: async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json("token not found");
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const foundUser = await findUserByEmail(user.email);
      if (!(foundUser && foundUser[0].isAdmin)) {
        return res.status(401).json("token not found");
      }
      next();
    } catch (error) {
      res.status(401).json("invalid token");
    }
  }
};
