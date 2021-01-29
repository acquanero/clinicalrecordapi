var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const DiseasesController = require('./controller')

//Route to create a new disease
router.post('/', isAuthenticated, async (req, res) => {

  const { name } = req.body;

  const newInsurance = await DiseasesController.pushDisease({
    name
  });

  let msg = 'No disease was created';

  if (newInsurance.result.n != 0) {

    msg = 'Disease created succesfully';

  }

  res.status(201);
  res.send({ 'msg': msg });

});

//Route to get list of diseases

router.get('/', isAuthenticated, async (req, res) => {

  const diseases = await DiseasesController.getDiseases();
  res.send(diseases);

})

//route to delete insurance
router.delete('/:diseaseid', isAuthenticated, async (req, res) => {

  const result = await DiseasesController.deleteDisease(req.params.diseaseid);

  let myResponse = { "msg": "No disease was deleted" }

  if (result.result.n != 0) {

    myResponse = { "msg": "The disease was deleted" }

  }

  res.send(myResponse);

})

//Edit disease name

router.put('/:diseaseid', isAuthenticated, async (req, res) => {

  let id = req.params.diseaseid;

  const { name } = req.body;

  const result = await DiseasesController.putDisease(id, name);

  let myResponse = { "msg": "No disease was modifyed" }

  if (result.result.n != 0) {

    myResponse = { "msg": "The disease was modifyed" }

  }

  res.send(myResponse);


})

module.exports = router;