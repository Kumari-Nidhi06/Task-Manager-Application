const Organizations = require('../models/organization.model');

const createOrganization = async (req, res) => {
    try {
        const org = await Organizations.findOne({
            email: req.body.email
        })
        if (org) {
            res.status(500).json({ message: "Organization Already Exist" })
        }
        const organization = new Organizations({
            name: req.body.name,
            email: req.body.email,
            details: req.body.details
        })
        console.log("Organization: ", organization);
        await organization.save();
        return res.status(200).json({ message: "Data Saved" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Organization Registration Failed " });
    }
}

const getOrganizationList = async (req, res) => {

    try {
        const organizationList = await Organizations.find()
        res.status(201).json({ message: "Successful", organizationList });
    }
    catch (error) {
        console.log(error);
    }
}

const deleteOrganization = async (req, res) => {
    try {
        await Organizations.findByIdAndDelete(req.params.organizationId);
        res.status(201).json({ message: "Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server Error" });
    }
}

module.exports = {
    createOrganization, getOrganizationList, deleteOrganization,
}