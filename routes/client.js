const express = require("express");

const filmClientController = require("../api/controller/film-client-controller");

const route = express.Router();

// * /client-page/
route.get("/", filmClientController.getFilmClient);

route.get(
  "/get-films-id/:id_phim_client",
  filmClientController.getFilmClientById
);

// */client-page/purchase
route.post("/purchase", filmClientController.purchaseFilms);

module.exports = route;
