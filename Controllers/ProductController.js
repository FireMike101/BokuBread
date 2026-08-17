const Product = require('../Models/Products');
const sendEmail = require('../Middleware/emailsender');




//create a new product longer way
// const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// module.exports = { createProduct };


//easier way to create a new product
exports.createProduct = async (req, res) => {
    try {

        //check if all required fields are provided
        if(!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }


        const { name, size, description, price, quantity, color } = req.body;

        const product = new Product({
            name,
            size,
            description,
            price,
            quantity,
            color,
        });

        await product.save();
//generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);
//send email notification to the admin that a new product has been added
    const subject = 'New Product Added';
    const text = `A new product has been added to the inventory: here is your otp: ${otp}\n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}\nColor: ${color}`;
    await sendEmail('michaelopia503@gmail.com', subject, text);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }

};

//create a product with image upload
exports.createProductWithImage = async (req, res) => {
    try {
        //check if all required fields are provided
        if(!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }



        //check if file is provided
        if(!req.file) {
            return res.status(400).json({ message: 'Please provide an image file' });
        }

        const { name, size, description, price, quantity, color } = req.body;
    

        const product = new Product({
            name,
            size,
            description,
            price,
            quantity,
            color,
            image: req.file.path //save the image path to the database
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};






//Get all products
exports.getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();

        res.status(200).json({ message: 'Products retrieved successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
        
    }
};

//Get a product by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params; //where id is
        const product = await Product.findById(id);
        
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product retrieved successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }   
};



//update product
exports.updateProduct = async (req, res) => {
    try { 
        const { id } = req.params; //where id is
        const { name, size, description, price, quantity, color } = req.body;

        const product = await Product.findByIdAndUpdate(id, {
            name,
            size,
            description,
            price,
            quantity,
            color
        }, { new: true });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};


//Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; //where id is
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
