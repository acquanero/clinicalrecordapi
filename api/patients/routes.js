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

  let thesurname = req.params.surname
  let surnameLower = thesurname.toLowerCase();

  const myquery = { surname: surnameLower };

  const patients = await PatientsController.getPatientsListByParam(myquery);
  res.send(patients);

})

//get list of patients by letter
router.get('/alphabetical/:letter', isAuthenticated, async (req, res) => {

  let letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];

  let theletter = req.params.letter;

  let lowerLetter = theletter.toLowerCase();

  //check if only a letter is recived, to avoid injection

  if (letras.includes(lowerLetter)) {

    var qstr = '/^' + lowerLetter + '/';

    const patients = await PatientsController.getPatientsListByParam({ surname: eval(qstr)});
  
    res.send(patients);

  } else {

    res.status(400)
    res.send({ 'msg': 'Bad request' })

  }

})

//get list of patients by hospital
router.get('/byhospital/:hospitalid', isAuthenticated, async (req, res) => {

  const myquery = { hospital: req.params.hospitalid };

  const patients = await PatientsController.getPatientsListByParam(myquery);
  res.send(patients);

})

//get patient by dni
router.get('/dni/:dni', isAuthenticated, async (req, res) => {

  const myquery = { dni: req.params.dni };

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

//get list of discharged
router.get('/data/:patientid', isAuthenticated, async (req, res) => {

  const patient = await PatientsController.getPatient(req.params.patientid);
  res.send(patient);

})

//set patients as discharged

router.put('/discharge/:patientid', isAuthenticated, async(req,res)=> {

  const result = await PatientsController.dischargePatient(req.params.patientid);

  if (result.result.n != 0) {

    res.status(201)
    res.send({ 'msg': 'The patient was discharged' })

  } else {
    res.status(500)
    res.send({ 'msg': 'No patient was discharged' })
  }

})


//Endpoints to perfom CRUD of one patient diseases

//Route to add a disease to a patient
router.post('/adddisease/:patientid', isAuthenticated, async (req, res) => {

  const { diseaseid } = req.body;

  const newPatientDisease = await PatientsController.pushPatientDisease({

    diseaseid: diseaseid,
    patientid: req.params.patientid,

  });

  let msg = 'No patient disease was added';

  if (newPatientDisease.result.n != 0) {

    msg = 'New patient disease added';

  }

  res.status(201)
  res.send({ 'msg': msg });

});

//Route to get the list of diseases from a patient

router.get('/getdiseases/:patientid', isAuthenticated, async(req, res) => {

  const result = await PatientsController.getPatientDiseases(req.params.patientid);

  res.send(result);


});

//route to delete disease from patient

router.delete('/deletedisease/:patientid', isAuthenticated, async(req, res) => {

  const { diseaseid } = req.body;

  const result = await PatientsController.deletePatientDisease(req.params.patientid, diseaseid);

  let msg = 'No disease was deleted';

  if (result.result.n != 0) {

    msg = 'The disease was deleted';

  }

  res.send({ 'msg': msg });

});

//Endpoints to perfom CRUD of one patient medications

//Route to add a medication to a patient
router.post('/addmedication/:patientid', isAuthenticated, async (req, res) => {

  const { medicationid } = req.body;

  const newPatientMedication = await PatientsController.pushPatientMedication({

    medicationid: medicationid,
    patientid: req.params.patientid,

  });

  let msg = 'No patient medication was added';

  if (newPatientMedication.result.n != 0) {

    msg = 'New patient medication added';

  }

  res.status(201)
  res.send({ 'msg': msg });

});

//Route to get the list of medications from a patient

router.get('/getmedications/:patientid', isAuthenticated, async(req, res) => {

  const result = await PatientsController.getPatientMedications(req.params.patientid);

  res.send(result);


});

//route to delete medication from patient

router.delete('/deletemedication/:patientid', isAuthenticated, async(req, res) => {

  const { medicationid } = req.body;

  const result = await PatientsController.deletePatientMedication(req.params.patientid, medicationid);

  let msg = 'No medication was deleted';

  if (result.result.n != 0) {

    msg = 'The medication was deleted';

  }

  res.send({ 'msg': msg });

});

module.exports = router;