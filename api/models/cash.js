const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cashSchema = new Schema({
  serial: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    required: true
  },
  activatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Auth'
  },
})

module.exports = mongoose.model("Cash", cashSchema);