const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const OrganizationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    }
})

const Organization = new mongoose.model("Organizations",OrganizationSchema);
module.exports = Organization;