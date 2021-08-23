"use strict";

/*
    In this case, we are useing 4 parameters, which means Express knows
    that it is for handling server erros
*/
module.exports = (error, req, res, next) => {
  const errorMsg = error.message ? error.message : error;
  const errorObj = {
    status: 500,
    message: errorMsg,
  };

  res.status(500).json(errorObj);
};
