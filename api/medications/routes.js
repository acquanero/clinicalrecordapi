var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const MedicationsController = require('./controller')

//Route to create a new medication
router.post('/', isAuthenticated, async (req, res) => {

  const { name, dose } = req.body;

  const newMedication = await MedicationsController.pushMedication({
    name,
    dose
  });

  let msg = 'No medication was created';

  if (newMedication.result.n != 0) {

    msg = 'Medication created succesfully';

  }

  res.status(201)
  res.send({ 'msg': msg });

});

//get list of medications
router.get('/', isAuthenticated, async (req, res) => {

  const medications = await MedicationsController.getMedications();
  res.send(medications);

})

//delete medication

router.delete('/:medicationid', isAuthenticated, async (req, res) => {

  const result = await MedicationsController.deleteMedication(req.params.medicationid);

  let myResponse = { "msg": "No medication was deleted" }

  if (result.result.n != 0) {

    myResponse = { "msg": "The medication was deleted" }

  }

  res.send(myResponse);


})

//modify medication data
router.put('/:medicationid', isAuthenticated, async (req, res) => {

  const { name, dose } = req.body;

  const newData = {
    'name': name,
    'dose': dose
  }

  const result = await MedicationsController.putMedication(req.params.medicationid, newData);

  let myResponse = { "msg": "No medication was modifyed" }

  if (result.result.n != 0) {

    myResponse = { "msg": "The medication was modifyed" }

  }

  res.send(myResponse);


})

module.exports = router;