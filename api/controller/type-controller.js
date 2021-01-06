const TypeModel = require("../models/type-model");

exports.postTypeFilm = (req, res) => {
  const typeData = req.body;

  const type = new TypeModel(typeData);

  type
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

  // const producer = new Producer()
};

exports.getTypeFilm = (req, res) => {
  TypeModel.find()
      .then((types) => {
        console.log(types);
  
        res.status(200).json({
          types,
        });
      })
      .catch((err) => {
        console.log(err);
  
        res.status(500).json({
          error: "have a problem",
        });
      });
  };

  