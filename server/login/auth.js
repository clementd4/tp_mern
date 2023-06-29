require("dotenv").config();
const jwt = require("jsonwebtoken");

const model_users = require('../models/Users')

async function findUserByEmail(email) {
  try {
      return await model_users.find({ email: email });
  } catch (err) {
      console.log(err);
      return null;
  }
}

module.exports = {
  auth: async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json("token not found");
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const existingUser = await findUserByEmail(user.email);
      if (existingUser === null || existingUser.length === 0) {
          return res.status(400).send('invalid token');
      }
      next();
    } catch (error) {
      return res.status(401).json("invalid token");
    }
  },

  authAdmin: async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json("token not found");
    }
    try {
      const user = jwt.verify(token, process.env.TOKEN_SECRET);
      const existingUser = await findUserByEmail(user.email);
      if (existingUser === null || existingUser.length === 0) {
          return res.status(400).send('invalid token');
      }
      if (!existingUser[0].isAdmin) {
        return res.status(400).send('invalid token');
      }
      next();
    } catch (error) {
      res.status(401).json("invalid token");
    }
  }
};
