const Tasks = require('../models/task.model');
const Users = require('../models/user.model');
const Organizations = require('../models/organization.model');

const createTask = async (req, res) => {
    try {
        console.log("Ceate task functino is called:");
        const userId = req.session.passport.user;
        const user = await Users.findById(userId);
        console.log(" task controller user is:", user);
        if (user.role === 'admin') {
            const task = new Tasks({
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId,
                status: 'pending',
                createdBy: user._id,
                updatedBy: req.body.updatedId,
            })
            await task.save();
            res.status(200).json({ message: " Task Posted Sucessfully", task })
        }
        if (user.role === 'user') {
            const task = new Tasks({
                title: req.body.title,
                description: req.body.description,
                userId: userId,
                status: 'pending',
                createdBy: user._id,
                updatedBy: req.body.updatedId,
            })
            console.log("task is :", task);
            await task.save();
            res.status(200).json({ message: "Task Posted Successfully", task });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllTaskByUserId = async (req, res) => {
    try {
        console.log("user from getAllTaskByUserId:", req.session.passport.user);
        const tasks = await Tasks.find({ createdBy: req.session.passport.user });
        console.log("TAsks", tasks);
        res.status(200).json({ tasks });
    }
    catch (err) {
        console.log(err);
    }
}

const updateTask = async (req, res) => {
    try {
        console.log("updateTask function is called");
        const task = await Tasks.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            updatedBy: req.session.passport.user
        })
        console.log("task is ", task);
        res.status(200).json({ message: "Updated Successfully" });
        await task.save();
    } catch (error) {
        res.status(500).json({ message: "Interbal Server Error" });
    }
}

const deleteTask = async (req, res) => {
    try {
        console.log("Delete Task by ID function is called:");
        await Tasks.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateStatus = async (req, res) => {
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, {
            status: 'completed',
        })
        console.log("task is ", task);
        res.status(200).json({ message: "Status Updated Successfully" });
        await task.save();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Interbal Server Error" });
    }
}

module.exports = {
    createTask, getAllTaskByUserId, updateTask, deleteTask, updateStatus
}