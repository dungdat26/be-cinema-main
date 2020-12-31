const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema ({
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required:true,
    },
    phone_number:{
        type: String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    date_of_birth:{
        type: String,
        required:true,
    },
    gender:{
        type: String,
        required:true,
    },
})

module.exports = mongoose.model("Auth", authSchema);