const authController =require('../controllers/AuthController');
const express = require('express');
const routes = express.Router();

    //register route
    routes.post('/register', authController.Register);

    //login route
    routes.post('/login', authController.Login);

//export routes
module.exports = routes;
