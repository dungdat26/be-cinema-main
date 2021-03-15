const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  films: [
    {
      filmId: {
        type: Schema.Types.ObjectId,
      },
      price: Number,
    },
  ],
  purchasedDate: {
    type: Date,
    default: Date.now(),
  },
  expireDate: {
    type: Date,
    // default: Date.now() + 200000,
    default: Date.now() + 2592000000,
  },
});

module.exports = mongoose.model("Order", orderSchema);
