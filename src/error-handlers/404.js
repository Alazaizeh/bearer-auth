"use strict";

/*
    Because we'll be building out an API that works with JSON,
    we're formating the response to a JSON object.
*/

module.exports = (req, res, next) => {
  const error = {
    status: 404,
    message: "Not Found",
  };

  res.status(404).json(error);
};
