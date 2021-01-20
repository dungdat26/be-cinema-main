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
        ref: "Film",
      },
      price: Number,
    },
  ],
  purchasedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
