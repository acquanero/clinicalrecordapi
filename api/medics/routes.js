var express = require('express');
var router = express.Router();

const MedicosController = require('./controller')

router.get('/', async (req, res) => {
  const medicos = await MedicosController.getMedicos();
  res.send(medicos);
});

module.exports = router;