const Producer = require("../models/producer-model");

exports.postProducer = (req, res) => {
  const producerData = req.body;

  const producer = new Producer(producerData);

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
  Producer.find()
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
