const express = require('express')
const router = express.Router();

const Users = require('../../models/Users');

router.get('/test', (req, res) => res.send('book route testing!'));

router.get('/', (req, res) => {
    Users.find()
        .then(user => res.json(user))
        .catch(err => res.status(404).json({noUserFound: 'Pas d utilisateurs trouvées...'}));
});

module.exports = router