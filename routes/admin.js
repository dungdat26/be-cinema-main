const express = require("express");
const { body } = require("express-validator");

const filmController = require("../api/controller/film-controller");
const producerController = require("../api/controller/producer-controller");
const actorController = require("../api/controller/actor-controller");
const directorController = require ("../api/controller/director-controller");
const the_loai_phimController = require ("../api/controller/type-controller");
const admin_Controller = require("../api/controller/adminstrator-controller")
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

// */admin-page/get-producers
router.get("/get-producers", producerController.getAllProducers);

// */admin-page/edit-producer/:id_producer
router.put("/edit-producer/:id_producer", producerController.updateProducer);

// */admin-page/detail-producer/:id_producer
router.get("/detail-producer/:id_producer", producerController.getDetailProducer);

// */admin-page/add-actor
router.post("/add-actor", actorController.postActor);

// */admin-page/get-actors
router.get("/get-actors", actorController.getAllActors);

// */admin-page/edit-actor/:id_actor
router.put("/edit-actor/:id_actor", actorController.updateActor);

// */admin-page/detail-actor/:id_actor
router.get("/detail-actor/:id_actor", actorController.getDetailActor);

// */admin-page/add-actor
router.post("/add-director", directorController.postDirector);

// */admin-page/get-directors
router.get("/get-directors", directorController.getAllDirectors);

// */admin-page/edit-director/:id_director
router.put("/edit-director/:id_director", directorController.updateDirector);

// */admin-page/detail-director/:id_director
router.get("/detail-director/:id_director", directorController.getDetailDirector);

// */admin-page/post-the_loai
router.post("/post-the_loai", the_loai_phimController.postTypeFilm);

// */admin-page/get-the_loai
router.get("/get-the_loai", the_loai_phimController.getTypeFilm);
// */admin-page/signup
router.post(
    "/signup",
    [
      body("email").trim().isEmail().normalizeEmail(),
      body("password").trim().isLength({ min: 6 }),
    ],
    admin_Controller.postSignup
  );
// */admin-page/Login     
  router.post("/login", admin_Controller.postLogin);
// */admin-page/auto-login    
  router.get("/auto-login", admin_Controller.autoLogin);
module.exports = router;
