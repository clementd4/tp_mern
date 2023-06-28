const express = require('express')
const router = express.Router();

const Product = require('../../models/Product');

router.get('/test', (req, res) => res.send('book route testing!'));

router.get('/', (req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(404).json({noProductFound: 'Pas de produits trouvées...'}));
});

module.exports = router