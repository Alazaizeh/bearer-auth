"use strict";
const express = require("express");

const router = express.Router();

const basicAuth = require("../middleware/basic-auth");
const bearerAuth = require("../middleware/bearer-auth");
const { Users } = require("../models/index");
// #0000000000000000000000000000000000

// {"username":"test", "password":"test"}
router.post("/signup", (req, res) => {
  // check if user name exists
  console.log(req.body);
  Users.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(400).send(err));
});

router.post("/signin", basicAuth(Users), (req, res) => {
  // the user will have the user info and the token
  res.status(200).send(req.user);
});

router.get("/user", bearerAuth(Users), (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
