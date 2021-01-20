const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const type_filmSchema = new Schema({

    type_name: {
      type: String,
      required: true,
    }
  });
  
  module.exports = mongoose.model("Types", type_filmSchema);
  