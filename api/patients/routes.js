var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const PatientsController = require('./controller')


//route to create a patient
router.post('/', isAuthenticated, async (req, res) => {

  const result = await PatientsController.pushPatient({
    name: req.body.name,
    surname: req.body.surname,
    dni: req.body.dni,
    birthdate: dateConverter.dateConverter(req.body.birthdate),
    insurance: req.body.insurance,
    insurancecategory: req.body.insurancecategory,
    adress: req.body.insurance,
    mail: req.body.mail,
    phone: req.body.phone,
    hospital: req.body.hospital,
    inpatient: req.body.inpatient
  });

  if (result.result.n != 0) {

    res.status(201)
    res.send({ 'patientid': result.ops[0]._id })

  } else {
    res.status(500)
    res.send({ 'patientid': 'error' })
  }

});

//get list of patients
router.get('/', isAuthenticated, async (req, res) => {

  const patients = await PatientsController.getPatients();
  res.send(patients);

})

//delete patient

router.delete('/:patientid', isAuthenticated, async (req, res) => {

  const result = await PatientsController.deletePatient(req.params.patientid);

  let myResponse = { "msg": "No patient was deleted" }

  if (result.result.n != 0) {

    myResponse = { "msg": "The patient was deleted" }

  }

  res.send(myResponse);


})

module.exports = router;