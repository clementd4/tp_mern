const express = require('express')
const router = express.Router();

const Product = require('../../models/Product');

const {auth, authAdmin} = require('../../authentication/auth')

router.get('/', auth ,(req, res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(404).json({noProductFound: 'Pas de produits trouvées...'}));
});

router.get('/:id', auth, (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json({noProductFound: 'Pas de produits trouvées...'}));
});

router.post('/', authAdmin, (req,res) => {
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(err => res.status(400).json({error: 'Impossible d ajouter le produit'}))
});

router.put('/:id', auth, (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(product => res.json('Mise à jour effectuée !'))
        .catch(err => res.status(404).json({error: 'Impossible de mettre à jour'}));
});

router.delete('/:id', authAdmin, (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body)
        .then(product => res.json('Produit bien supprimé !'))
        .catch(err => res.status(404).json({error: 'Impossible de supprimer'}));
});



module.exports = router