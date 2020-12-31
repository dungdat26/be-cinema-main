const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const producerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  films: [
    {
      filmId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    },
  ],
  introduce:{
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Producer", producerSchema);
