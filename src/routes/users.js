"use strict";
const express = require("express");

const router = express.Router();

const basicAuth = require("../middleware/basic-auth");
const bearerAuth = require("../middleware/bearer-auth");
const { Users } = require("../models/index");
const signUpMiddleware = require("../middleware/signUp");

// {"username":"test", "password":"test"}
router.post("/signup", signUpMiddleware(Users), (req, res) => {
  // check if user name exists
  //   console.log(req.body);
  //   Users.findOne({ where: { username: req.body.username } }).then((user) => {
  //     if (!user) {
  //       Users.create(req.body)
  //         .then((user) => res.status(201).send(user))
  //         .catch((err) => res.status(400).send(err));
  //     } else {
  //       res.status(400).json("User name exists");
  //     }
  //   });
});

router.post("/signin", basicAuth(Users), (req, res) => {
  // the user will have the user info and the token
  res.status(200).send(req.user);
});

router.get("/secret", bearerAuth(Users), (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
