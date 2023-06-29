const express = require('express')
const router = express.Router();
const Users = require('../../models/Users');

router.get('/', (req, res) => {
    Users.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound: 'Pas d utilisateurs trouvées...'}));
});

router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound: 'Pas d utilisateur trouvé...'}));
});

router.post('/', (req,res) => {
    Users.create(req.body)
        .then(user => {res.json(user)})
        .catch(err => res.status(400).json({error: 'Impossible d ajouter l utilisateur'}))
});


router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json('Mise à jour effectuée !'))
        .catch(err => res.status(404).json({error: 'Impossible de mettre à jour'}));
});

router.delete('/:id', (req, res) => {
    Users.findByIdAndRemove(req.params.id, req.body)
        .then(user => res.json('Utilisateur bien supprimé !'))
        .catch(err => res.status(404).json({error: 'Impossible de supprimer'}));
});

module.exports = router