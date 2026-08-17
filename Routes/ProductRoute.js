const express = require('express');
//import authentication middleware
const { protect } = require('../Middleware/auth');
const upload = require('../Middleware/upload');

//import authorization middleware
const { authorize } = require('../Middleware/role');    

const router = express.Router(); //create a router instance

//import the product controller
const productController = require('../Controllers/ProductController');

//define the routes
router.post('/createproduct', protect, authorize('superadmin', 'salesperson'), productController.createProduct); //create a new product

router.post('/createproductwithimage', protect, upload.single('image'), productController.createProductWithImage); //create a new product with image upload

router.get('/getallproducts', protect, productController.getAllProducts); //get all products

router.get('/getproduct/:id', protect, productController.getProductById); //get a product by id

router.put('/updateproduct/:id', protect, authorize('storekeeper'), productController.updateProduct); //update a product by id

router.delete('/deleteproduct/:id', protect, productController.deleteProduct); //delete a product by id

//export the router to be used in other files
module.exports = router; 
