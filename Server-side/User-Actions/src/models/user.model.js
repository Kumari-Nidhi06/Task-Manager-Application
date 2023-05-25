const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, role: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    orgId: {
        type: ObjectId,
    },
    reportingTo: {
        type: ObjectId
    },
    createdBy: {
        type: ObjectId
    },
    updatedBy: {
        type: ObjectId
    }
})

const User = new mongoose.model("Users", UserSchema);
module.exports = User;