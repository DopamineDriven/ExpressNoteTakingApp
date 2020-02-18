const mongoose = require("mongoose");
const Schema = mongoose.Schema

const publicSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //no required true boolean because access tokens are only issued when logged in
    accessToken: {
        type: String
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const PublicModel = mongoose.model('User', publicSchema);

module.exports = PublicModel