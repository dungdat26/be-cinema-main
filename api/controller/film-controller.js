const FilmModel = require("../models/film-model");
const producerModel = require("../models/producer-model");
const actorModel = require ("../models/actor-model");
const directorModel = require ("../models/director-model");

exports.getAllFilm = async (req, res) => {
  //   console.log(req);

  // .execPopulate()

 const films = await FilmModel.find({},'name gender introduce avatar.thumb')
    .populate("producer")
    .populate("actors")
    .populate("director")

    .then((films) => {
      console.log(films.producer);

      res.status(200).json({
        films: films,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "[post addfilm] co loi",
      });
    });
};

exports.postAddFilm = (req, res) => {
  const dataFilm = req.body;

  // console.log(dataFilm);
  const producerId = req.body.producer;

  const actorId =  req.body.actor;
  const directorId = req.body.director;

  const film = new FilmModel(dataFilm);

  film
    .save()
    .then((result) => {
      console.log(result);
      
      return producerModel.findById(producerId);

      })
    .then((producer)=>{
      producer.film.push(result._id);

      return producer.save();
    })

    ////save actor by ID
    .save()
    .then((result) => {
      console.log(result);

      return actorModel.findById(actorId);

      })
    .then((actor)=>{
      actor.film.push(result._id);

      return actor.save();
    })

    ///// save director by Id
    .save()
    .then((result) => {
      console.log(result);
      
      return directorModel.findById(directorId);
      })
    .then((director)=>{
      director.film.push(result._id);

      return director.save();
    })

    .then((result)=>{
      res.status(201).json({
        //data
      })
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "[post addfilm] co loi",
      });
    });

  //   res.json({
  //     message: "receive",
  //   });
};

exports.getDetailFilm = (req, res) => {
  const id_phim = req.params.id_phim;
  //   console.log(req.params.id_phim);

  FilmModel.findById(id_phim)
    .populate("producer")
    .then((film) => {
      console.log(film);

      res.status(200).json({
        film: film,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "[post addfilm] co loi",
      });
    });
};

exports.updateFilm = (req, res) => {
  const id_phim = req.params.id_phim;
  const dataFilm = req.body;

  // dataFilm.date = dataFilm.date.split("T")[0];

  console.log("update");
  console.log(dataFilm);

  FilmModel.findByIdAndUpdate(id_phim,{ $set:dataFilm } )
    .then((result) => {
      res.json({
        error: false,
        message: "receive",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        message: "error",
      });
    });
};
