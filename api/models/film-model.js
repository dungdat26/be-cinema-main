const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const filmSchema = new Schema({
  EN_name: {
    type: String,
    required: true,
  },
  VN_name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  urlImg: {
    type: String,
    required: true,
  },
  director: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Director",
  },
  actors: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Actor",
  },
  producer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Producer",
  },
  country: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  urlFilm: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Film", filmSchema);
