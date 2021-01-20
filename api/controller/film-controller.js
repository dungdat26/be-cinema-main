const FilmModel = require("../models/film-model");
const producerModel = require("../models/producer-model");
const actorModel = require("../models/actor-model");
const directorModel = require("../models/director-model");

exports.getAllFilm = async (req, res) => {
  //   console.log(req);

  // .execPopulate()

  // async ... await bất đồng bộ

  const films = await FilmModel.find()
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
  // console.log(dataFilm);

  console.log(req.body);
  // map lại actors theo dạng array bên trong actors là object
  const dataFilm = { ...req.body };
  dataFilm.actors = dataFilm.actors.map((actor) => {
    return { actorId: actor };
  });

  // map lại directors theo dạng array bên trong directors là object
  dataFilm.directors = dataFilm.directors.map((director) => {
    return { directorId: director };
  });

  // map lại producers theo dạng array bên trong producers là object
  dataFilm.producers = dataFilm.producers.map((producer) => {
    return { producerId: producer };
  });

  // map lại types theo dạng array bên trong types là object
  dataFilm.types = dataFilm.types.map((type) => {
    return { typeId: type };
  });

  const film = new FilmModel(dataFilm);

  film
    .save()
    .then((film) => {
      console.log(film);

      res.status(201).json(film);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });

  // film
  //   .save()
  //   .then((result) => {
  //     console.log(result);

  //     return producerModel.findById(producerId);

  //     })
  //   .then((producer)=>{
  //     producer.film.push(result._id);

  //     return producer.save();
  //   })

  //   ////save actor by ID
  //   .save()
  //   .then((result) => {
  //     console.log(result);

  //     return actorModel.findById(actorId);

  //     })
  //   .then((actor)=>{
  //     actor.film.push([result._id]);

  //     return actor.save();
  //   })

  //   ///// save director by Id
  //   .save()
  //   .then((result) => {
  //     console.log(result);

  //     return directorModel.findById(directorId);
  //     })
  //   .then((director)=>{
  //     director.film.push(result._id);

  //     return director.save();
  //   })

  //   .then((result)=>{
  //     res.status(201).json({
  //       //data
  //     })
  //   })

  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       message: "[post addfilm] co loi",
  //     });
  //   });

  //   res.json({
  //     message: "receive",
  //   });
};

exports.getDetailFilm = (req, res) => {
  const id_phim = req.params.id_phim;
  //   console.log(req.params.id_phim);
  try {
    FilmModel.findById(id_phim)
      .populate("actors")
      .populate("producer")
      .populate("directors")
      .then((film) => {
        console.log(film);

        res.status(200).json({
          film: film,
        });
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.updateFilm = (req, res) => {
  const id_phim = req.params.id_phim;
  const dataFilm = req.body;

  // dataFilm.date = dataFilm.date.split("T")[0];

  console.log("update");
  console.log(dataFilm);
  dataFilm.actors = dataFilm.actors.map((actor) => {
    return { actorId: actor };
  });

  // map lại directors theo dạng array bên trong directors là object
  dataFilm.directors = dataFilm.directors.map((director) => {
    return { directorId: director };
  });

  // map lại producers theo dạng array bên trong producers là object
  dataFilm.producers = dataFilm.producers.map((producer) => {
    return { producerId: producer };
  });

  // map lại types theo dạng array bên trong types là object
  dataFilm.types = dataFilm.types.map((type) => {
    return { typeId: type };
  });

  FilmModel.findByIdAndUpdate(id_phim, { $set: dataFilm })
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

exports.searchFilmByName = async (req, res, next) => {
  const { name } = req.query;

  //? c là kí tự mình truyền vào
  //? [] là khớp với những thứ có trong nó
  //? \w\W và dấu cách là lấy tất cả các ký tự
  //? * là có hoặc không có đều được
  //! xong rồi đó làm tiếp đi

  const stringRegex = name
    .split("")
    .map((c) => `${c}[\\w\\W ]*`)
    .join("");

  const nameRegex = new RegExp(stringRegex);

  const films = await FilmModel.find({
    $or: [
      { EN_name: { $regex: nameRegex, $options: "gi" } },
      { VN_name: { $regex: nameRegex, $options: "gi" } },
    ],
  });

  // console.log(films);

  res.json(films);
  res.send(+req.query.name);
};
