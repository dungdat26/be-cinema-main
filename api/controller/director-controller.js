const DirectorModel = require("../models/director-model");

exports.postDirector = (req, res) => {
  const directorData = req.body;

  const director = new DirectorModel(directorData);

  director
    .save()
    .then((result) => {
      console.log(result);

      res.status(201).json({
        message: "receive",
        director: result,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: "have a problem",
      });
    });
};
exports.getAllDirectors = (req, res) => {
  DirectorModel.find()
      .then((directors) => {
        console.log(directors);
  
        res.status(200).json({
          directors,
        });
      })
      .catch((err) => {
        console.log(err);
  
        res.status(500).json({
          error: "have a problem",
        });
      });
  };

  exports.updateDirector = (req, res) => {
    const id_director = req.params.id_director;
    const directorData = req.body;
  
    // console.log("update");
    // console.log(directorData);
  
    DirectorModel.findByIdAndUpdate(id_director,{$set: directorData})
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

  exports.getDetailDirector = (req, res) => {
    const id_director = req.params.id_director;
    //   console.log(req.params.id_producer);
  
    DirectorModel.findById(id_director)
      .then((director) => {
        console.log(director);
  
        res.status(200).json({
          director: director,
        });
      })
      .catch((err) => {
        console.log(err);
  
        res.status(500).json({
          message: "[post add director] co loi",
        });
      });
  };