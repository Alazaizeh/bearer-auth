"use strict";
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "super-secret";

const Users = (sequelize, DataTypes) =>
  sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          { username: this.username, test: "this is a test payload" },
          SECRET
        );
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
  });

module.exports = Users;
