const express = require("express");

const filmClientController = require("../api/controller/film-client-controller");

const authClientController = require('../api/controller/auth-controller');
const route = express.Router();

// * /client-page/
route.get("/", filmClientController.getFilmClient);

route.get(
  "/get-films-id/:id_phim_client",
  filmClientController.getFilmClientById
);

// */client-page/purchase
route.post("/purchase", filmClientController.purchaseFilms);

// */client-page/comments-client
route.post('/comments-client/:id_phim', authClientController.postComment);

// */client-page/comments-client
route.get('/get-comments/:id_phim_client', authClientController.getComment);
module.exports = route;

route.get(
  "/get-films-id_actor/:id_phim_client",
  filmClientController.getFilmClientActorsById
);