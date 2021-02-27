const mongoose = require('mongoose');

const UserSchema=mongoose.Schema({
    name: {
        type: String,
        reqiured : true
    },
    email: {   //unique
        type: String,
        reqiured : true
    },
    password: {
        type: String,
        required : true
    }
})


module.exports= mongoose.model("User",UserSchema);