const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  urlImgabc: {
    type: String,
  },
  urlImg: {
    type: String,
  },
  urlImg2: {
    type: String,
  },
  urlImg3: {
    type: String,
  },
  urlNewsClip: {
    type: String,
  },
  title: {
     type: String,
     required: true,
   },
   source: {
     type: String,
    
   },
   brief: {
    type: String,
    required: true,
  },
   content: {
    type: String,
    required: true,
  },
  content2: {
    type: String,
  },
  content3: {
    type: String,
  },
  content4: {
    type: String,
  },
  content5: {
    type: String,
  },
});
module.exports = mongoose.model("News", newsSchema );