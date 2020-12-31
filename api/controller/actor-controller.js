const Actor = require("../models/actor-model");

exports.postActor = (req, res) => {
  const actorData = req.body;

  const actor = new Actor(actorData);

  actor
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
exports.getAllActors = (req, res) => {
    Actor.find()
      .then((actors) => {
        console.log(actors);
  
        res.status(200).json({
            actors,
        });
      })
      .catch((err) => {
        console.log(err);
  
        res.status(500).json({
          error: "have a problem",
        });
      });
  };
  
