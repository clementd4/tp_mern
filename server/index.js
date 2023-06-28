require('dotenv').config();
const express = require('express');
let cors = require('cors');

const Product = require('./routes/api/product')
const Users = require('./routes/api/users')


const connectDb = require('./db/conn')

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/product', Product)
app.use('/api/users', Users)


app.listen(5000, () => {
    console.log("http://localhost:5000");
})