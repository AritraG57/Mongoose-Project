const express = require("express");
const error = express.Router();

const { errorController } = require("../controllers/errorController");

error.use(errorController);

module.exports = error;
