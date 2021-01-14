var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');
const PatientSurgerysController = require('./controller')

//Route to create a new patient surgery
router.post('/', isAuthenticated, async (req, res) => {

  const newSurgery = await PatientSurgerysController.pushPatientSurgery({
    patientid: req.body.patientid,
    typeofsurgeryid: req.body.typeofsurgeryid,
    pathologyid: req.body.pathologyid,
    medicid: req.body.medicid,
    date: dateConverter.dateConverter(req.body.date),
    description: req.body.description
  });

  let msg = 'No surgery was created for the patient';

  if (newSurgery.result.n != 0) {

    msg = 'New patient surgery created succesfully';

  }

  res.status(201)
  res.send({ 'msg': msg });

});

//Route to get list of one patient surgerys

router.get('/:patientid', isAuthenticated, async(req, res) => {

  const surgerys = await PatientSurgerysController.getPatientSurgerys(req.params.patientid);

  res.send(surgerys);

})

module.exports = router;