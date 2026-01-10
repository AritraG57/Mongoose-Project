//importing the modules
const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

//For body parsing

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/home-added", hostController.postAddHome);
hostRouter.get('/host/host-homes',hostController.getHostHomes);
hostRouter.get('/host/edit-home/:homeId',hostController.hostGetEditHomes);
hostRouter.post('/edit-home',hostController.postEditHomes);
hostRouter.post('/delete-home/:homeId',hostController.postDeleteHome);
//exporting
exports.hostRouter = hostRouter;
