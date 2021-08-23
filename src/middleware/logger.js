"use strict";

module.exports = (req, res, next) => {
  console.log("Request Logger:", req.method, req.path);
  next();
};
