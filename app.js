const express = require('express');
const app = express();

const dotenv = require('dotenv');

const productRoutes = require('./Routes/ProductRoute');
const userRoutes = require('./Routes/UserRoute');

dotenv.config(); //load environment variables from .env file

app.use(express.json()); //middleware to parse JSON request body





app.use('/products', productRoutes); //use the product routes for all routes starting with /products
app.use('/users', userRoutes); //use the user routes for all routes starting with /users

const connectDB = require('./Config/databaseConfig');
connectDB(); //connect to the database MongoDB


app.use('/products', productRoutes); //use the product routes

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ${process.env.PORT}');
});