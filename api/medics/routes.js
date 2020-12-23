var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const MedicosController = require('./controller')

router.get('/', isAuthenticated, async (req, res) => {

    const medicos = await MedicosController.getMedicos();
    res.send(medicos);

});

router.post('/', async (req, res) => {
  const { name, surname, mdNumber, mail, password } = req.body;

  const result = await MedicosController.pushMedico({
    name,
    surname,
    mdNumber,
    mail,
    password,
    admin: false,
    active: false
  });

  res.send(result);
  
});

module.exports = router;