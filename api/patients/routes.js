var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const PatientsController = require('./controller')


//route to create a patient
router.post('/', isAuthenticated, async (req, res) => {

  let surnameLower = req.body.surname
  let nameLower = req.body.name

  const result = await PatientsController.pushPatient({
    name: nameLower.toLowerCase(),
    surname: surnameLower.toLowerCase(),
    dni: req.body.dni,
    birthdate: dateConverter.dateConverter(req.body.birthdate),
    insurance: req.body.insurance,
    insurancecategory: req.body.insurancecategory,
    adress: req.body.adress,
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

//route to modify a patient
router.put('/:patientid', isAuthenticated, async (req, res) => {

  let surnameLower = req.body.surname
  let nameLower = req.body.name

  const result = await PatientsController.putPatient(req.params.patientid, {
    name: nameLower.toLowerCase(),
    surname: surnameLower.toLowerCase(),
    dni: req.body.dni,
    birthdate: dateConverter.dateConverter(req.body.birthdate),
    insurance: req.body.insurance,
    insurancecategory: req.body.insurancecategory,
    adress: req.body.adress,
    mail: req.body.mail,
    phone: req.body.phone,
    hospital: req.body.hospital,
    inpatient: req.body.inpatient
  });

  if (result.result.n != 0) {

    res.status(201)
    res.send({ 'msg': 'The patient information was modified' })

  } else {
    res.status(500)
    res.send({ 'msg': 'No patient was modified' })
  }

});

//get list of patients by surname
router.get('/bysurname/:surname', isAuthenticated, async (req, res) => {

  const myquery = { surname: req.params.surname };

  const patients = await PatientsController.getPatientsListByParam(myquery);
  res.send(patients);

})

//get list of patients by hospital
router.get('/byhospital/:hospitalid', isAuthenticated, async (req, res) => {

  const myquery = { hospital: req.params.hospitalid };

  const patients = await PatientsController.getPatientsListByParam(myquery);
  res.send(patients);

})

//get list of inpatients
router.get('/inpatients', isAuthenticated, async (req, res) => {

  const myquery = {inpatient: {$eq: true}};

  const patients = await PatientsController.getPatientsListByParam(myquery);
  res.send(patients);

})

//get list of discharged
router.get('/discharged', isAuthenticated, async (req, res) => {

  const myquery = {inpatient: {$eq: false}};

  const patients = await PatientsController.getPatientsListByParam(myquery);
  res.send(patients);

})

module.exports = router;