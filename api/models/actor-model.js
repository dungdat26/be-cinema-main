const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const actorSchema = new Schema ({
    name_actor: {
        type: String,
        required : true,
    },
    gender: {
        type: Number,
        required: true,
    },
    avatar:{
        type: String,
        required: true,
    },
    actor_introduce:{
        type: String,
        required:true,
    }
})
module.exports = mongoose.model("Actor",actorSchema);