const express = require("express");

const adminController = require("../api/controller/auth-controller");
const filmController = require("../api/controller/film-controller");
const producerController = require("../api/controller/producer-controller");
const actorController = require("../api/controller/actor-controller");
const directorController = require ("../api/controller/director-controller");
const the_loai_phimController = require ("../api/controller/type-controller");

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

router.put("/edit-producer/:id_producer", producerController.updateProducer);

router.get("/detail-producer/:id_producer", producerController.getDetailProducer);
// */admin-page/add-actor
router.post("/add-actor", actorController.postActor);

router.get("/get-actors", actorController.getAllActors);

router.put("/edit-actor/:id_actor", actorController.updateActor);

router.get("/detail-actor/:id_actor", actorController.getDetailActor);

// */admin-page/add-actor
router.post("/add-director", directorController.postDirector);

router.get("/get-directors", directorController.getAllDirectors);

router.put("/edit-director/:id_director", directorController.updateDirector);

router.get("/detail-director/:id_director", directorController.getDetailDirector);
// */admin-page/get-the_loai
 
router.post("/post-the_loai", the_loai_phimController.postTypeFilm);

router.get("/get-the_loai", the_loai_phimController.getTypeFilm);
                                                                                          
module.exports = router;
