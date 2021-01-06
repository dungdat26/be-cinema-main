const ActorModel = require("../models/actor-model");

exports.postActor = (req, res) => {
  const actorData = req.body;

  const actor = new ActorModel(actorData);

  actor
    .save()
    .then((result) => {
      console.log(result);

      res.status(201).json({
        message: "receive",
        actor: result,
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
  ActorModel.find()
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

exports.updateActor = (req, res) => {
  const id_actor = req.params.id_actor;
  const actorData = req.body;

  console.log("update");
  console.log(actorData);

  ActorModel.findByIdAndUpdate(id_actor, { $set: actorData })
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

exports.getDetailActor = (req, res) => {
  const id_actor = req.params.id_actor;
  //   console.log(req.params.id_actor);

  ActorModel.findById(id_actor)
    .then((actor) => {
      console.log(actor);

      res.status(200).json({
        actor: actor,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "[post add producer] co loi",
      });
    });
};
