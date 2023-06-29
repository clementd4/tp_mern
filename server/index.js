require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const connectDb = require('./db/conn')
connectDb();

const Product = require('./routes/api/product')
const Users = require('./routes/api/users')

const model_users = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

function generateAccessToken(json) {
    return jwt.sign(json, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

async function findUserByEmail(email) {
    try {
        return await model_users.find({ email: email });
    } catch (err) {
        console.log(err);
        return null;
    }
}

app.post('/signup', async (req, res) => {
    const existingUser = await findUserByEmail(req.body.email);
    if (existingUser.length !== 0) {
        return res.status(400).send('Email déja utilisé');
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    try {
        await model_users.create(req.body)
    } catch (err) {
        return res.status(500).send('Internal Server Error');
    }

    const access_token = generateAccessToken({email: req.body.email, isAdmin: false});

    return res.status(200).json({access_token})
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser === null || existingUser.length === 0) {
        return res.status(401).send('Email ou mot de passe incorrect');
    }

    const isValid = bcrypt.compareSync(password, existingUser[0].password);
    if (!isValid) {
        return res.status(401).send("Mot de passe incorrect")
    }

    const access_token = generateAccessToken({email: req.body.email});

    return res.status(200).json({access_token: access_token, isAdmin: existingUser[0].isAdmin})
});

const {auth, authAdmin} = require('./authentication/auth')

app.use('/api/product', Product)
app.use('/api/users', authAdmin, Users)

app.listen(5000, () => {
    console.log("http://localhost:5000");
})