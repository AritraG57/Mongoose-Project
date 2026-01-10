//importing modules
const express = require("express");
const storeRouter = express.Router();
const rootDir = require("../utils/rootDir");
const path = require("path");
// const {bodyParsed} = require('./hostRouter')
const storeController = require("../controllers/storeController");

//Routes
storeRouter.get("/", storeController.homeList);
storeRouter.get("/home/:homeId", storeController.getHomeDetails);
storeRouter.get("/favourites", storeController.getAddToFavourites);
storeRouter.post("/favourites", storeController.postAddToFavourites);
storeRouter.post('/favourites/delete/:homeId',storeController.postDeleteFavourites);

//exports
module.exports = storeRouter;
