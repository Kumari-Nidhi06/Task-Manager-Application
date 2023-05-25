const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId:{
        type:ObjectId,
    },
    status:{
        type:String
    },
    createdBy:{
        type:ObjectId
    },
    updatedBy:{
        type:ObjectId
    }
});

const Task = new mongoose.model("tasks", TaskSchema);
module.exports = Task;