const express = require("express");

const adminController = require("../api/controller/auth-controller");
const filmController = require("../api/controller/film-controller");
const producerController = require("../api/controller/producer-controller");
const actorController = require("../api/controller/actor-controller");
const directorController = require ("../api/controller/director-controller");


const router = express.Router();

// * /admin-page
router.get("/", filmController.getAllFilm);

// */admin-page/add-film
router.post("/add-film", filmController.postAddFilm);

// */admin-page/detail-film/:id_phim
router.get("/detail-film/:id_phim", filmController.getDetailFilm);

// */admin-page/edit-film/:id_phim
router.put("/edit-film/:id_phim", filmController.updateFilm);

// */admin-page/add-producer
router.post("/add-producer", producerController.postProducer);

router.get("/get-producers", producerController.getAllProducers);

// */admin-page/add-actor
router.post("/add-actor", actorController.postActor);

router.get("/get-actors", actorController.getAllActors);
// */admin-page/add-actor
router.post("/add-director", directorController.postDirector);

router.get("/get-director", directorController.getAllDirectors);
module.exports = router;
