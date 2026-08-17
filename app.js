const express = require('express');
const app = express();

const dotenv = require('dotenv');

dotenv.config(); //load environment variables from .env file

app.use(express.json()); //middleware to parse JSON request body
const productRoutes = require('./Routes/ProductRoute');
const userRoutes = require('./Routes/UserRoute');





app.use('/products', productRoutes); //use the product routes for all routes starting with /products
app.use('/users', userRoutes); //use the user routes for all routes starting with /users
const connectDB = require('./Config/databaseConfig');
connectDB(); //connect to the database MongoDB



app.listen(process.env.PORT, () => {
    console.log('Server is running on port ${process.env.PORT}');
});