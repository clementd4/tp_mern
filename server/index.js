require('dotenv').config();
const express = require('express');
let cors = require('cors');

const connectDb = require('./db/conn')

const app = express();
app.use(cors());
app.use(express.json());

connectDb();

app.listen(5000, () => {
    console.log("http://localhost:5000");
})