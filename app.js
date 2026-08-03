const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const app = express();
const productRoutes = require('./Routes/ProductRoute');

dotenv.config();
connectDB();

app.use(express.json()); //middleware to parse JSON request body


app.use('/products', productRoutes); //use the product routes

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ${process.env.PORT}');
});