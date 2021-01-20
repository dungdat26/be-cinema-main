const mongoose = require ("mongoose");

const Schema = mongoose.Schema;

const directorSchema = new Schema ({
    name_director: {
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
    director_introduce:{
        type: String,
        required:true,
    }
})
module.exports = mongoose.model("Director",directorSchema );