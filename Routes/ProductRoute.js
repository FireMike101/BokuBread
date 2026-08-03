const express = require('express');
const router = express.Router(); //create a router instance

//import the product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', productController.createProduct); //create a new product

router.put('/updateproduct/:id', productController.updateProduct); //update a product by id

//export the router to be used in other files
module.exports = router;