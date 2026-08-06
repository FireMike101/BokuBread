const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

//define the routes for user
router.post('/createuser', userController.createUser);
router.post('/loginuser', userController.loginUser);

//export the router to use in other files
module.exports = router;