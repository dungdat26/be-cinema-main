const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    filmId: {
        type: Schema.Types.ObjectId,
        ref: "Film",
      },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Auth",
      },
    content: {
        type: String,
        default: " ",
      },
    comment_date:{
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("CommentUser",commentSchema);