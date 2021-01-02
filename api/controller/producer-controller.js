const producerModel = require("../models/producer-model");

exports.postProducer = (req, res) => {
  const producerData = req.body;

  const producer = new producerModel(producerData);

  producer
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

exports.getAllProducers = (req, res) => {
  producerModel.find()
    .then((producers) => {
      console.log(producers);

      res.status(200).json({
        producers,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: "have a problem",
      });
    });
};

exports.updateProducer = (req, res) => {
  const id_producer = req.params.id_producer;
  const producerData = req.body;

  console.log("update");
  console.log(producerData);

  producerModel.findByIdAndUpdate(id_producer, {$set: producerData})
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

exports.getDetailProducer = (req, res) => {
  const id_producer = req.params.id_producer;
  //   console.log(req.params.id_producer);

  producerModel.findById(id_producer)
    .then((producer) => {
      console.log(producer);

      res.status(200).json({
        producer: producer,
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "[post add producer] co loi",
      });
    });
};