const Director = require("../models/director-model");

exports.postDirector = (req, res) => {
  const directorData = req.body;

  const director = new Director(directorData);

  director
    .save()
    .then((result) => {
      console.log(result);

      res.status(201).json({
        message: "receive",
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
  Director.find()
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
  
