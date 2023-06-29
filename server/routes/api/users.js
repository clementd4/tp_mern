const express = require('express')
const router = express.Router();
const Users = require('../../models/Users');
const bcrypt = require('bcrypt')

const {auth, authAdmin} = require('../../authentication/auth')


router.get('/', authAdmin, (req, res) => {
    Users.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound: 'Pas d utilisateurs trouvées...'}));
});

router.get('/:id', authAdmin, (req, res) => {
    Users.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound: 'Pas d utilisateur trouvé...'}));
});

router.post('/', authAdmin, (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    Users.create(req.body)
        .then(user => {res.json(user)})
        .catch(err => res.status(400).json({error: 'Impossible d ajouter l utilisateur'}))
});


router.put('/:id', authAdmin, async (req, res) => {
    if (req.body.password !== "") {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    } else {
        const user = await Users.findById(req.params.id);
        req.body.password = user.password;
    }
    Users.findByIdAndUpdate(req.params.id, req.body)
        .then(user => {res.json('utilisateur ajouté')})
        .catch(err => res.status(404).json({error: 'Impossible de mettre à jour'}));
});

router.delete('/:id', authAdmin, (req, res) => {
    Users.findByIdAndRemove(req.params.id, req.body)
        .then(user => res.json('Utilisateur bien supprimé !'))
        .catch(err => res.status(404).json({error: 'Impossible de supprimer'}));
});

module.exports = router