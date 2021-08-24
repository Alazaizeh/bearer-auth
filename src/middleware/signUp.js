const { Users } = require("../models/index");
const bccrypt = require("bcrypt");
const base64 = require("base-64");
// create a new user
module.exports = (users) => async (req, res, next) => {
  //1- get user info from the request.
  let authHeader = req.headers.authorization;

  // let encodedCreditentials = authHeader.split(' ')[1];
  let encodedCreditentials = authHeader.split(" ").pop();

  let decodedCreditentials = base64.decode(encodedCreditentials);
  // username:password
  console.log(decodedCreditentials);

  let [username, password] = decodedCreditentials.split(":");

  const user = await Users.findOne({ where: { username } });
  if (!user) {
    Users.create({ username, password })
      .then((user) => res.status(201).send(user))
      .catch((err) => res.status(400).send(err));
  } else {
    res.status(401).json("User name exists");
  }
};
