const bodyParser = require('body-parser').json();
const userController = require('../controllers/user.controller');
const organizationController = require('../controllers/organization.controller');

module.exports = function routes(passport) {

    const router = require('express').Router();
    router.get('/hello', (req, res) => {
        res.send("Hello");
    });

    router.post('/login', userController.login(passport));

    router.post('/createOrganization', organizationController.createOrganization);

    router.get('/getOrganizationList', organizationController.getOrganizationList);

    router.delete('/deleteOrganization/:organizationId', organizationController.deleteOrganization);

    router.post('/createAdmin', bodyParser, userController.createAdmin);

    router.post('/createUser', userController.createUser);

    router.post('/logout', userController.logout);

    router.delete('/deleteUsers/:userId', userController.deleteUsers);

    router.get('/getAdminList', userController.getAdminList);

    router.get('/getUserList', userController.getUserList);

    return router;
}



