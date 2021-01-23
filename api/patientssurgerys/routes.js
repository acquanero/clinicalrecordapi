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

//Route to delete patient surgery
router.delete('/:surgeryid', isAuthenticated, async(req, res) => {

  const result = await PatientSurgerysController.deletePatientSurgery(req.params.surgeryid);

  let myResponse = {"msg": "No surgery was deleted"}

  if (result.result.n != 0){

    myResponse = {"msg": "The surgery was deleted"}

  }

  res.send(myResponse);

})

//Route to modify a  patient surgery
router.put('/:surgeryid', isAuthenticated, async (req, res) => {

  const { patientid, typeofsurgeryid, pathologyid, medicid, date, description } = req.body;

  let surgeryid = req.params.surgeryid;

  const newData = {
    "patientid": patientid,
    "typeofsurgeryid": typeofsurgeryid,
    "pathologyid": pathologyid,
    "medicid": medicid,
    "date": dateConverter.dateConverter(date),
    "description": description,
  }

  const stateResponse = await PatientSurgerysController.updatePatientSurgery(surgeryid, newData);

  let msg = 'No surgery was modify';

  if (stateResponse.result.n != 0) {

    msg = 'The patients surgery was modifyed';

  }

  res.status(201)
  res.send({ 'msg': msg });

});


//Endpoint to perfom CRUD of one patient surgery supplys

//Route to create a new supply for a patients surgery
router.post('/addsupplytosurgery/:surgeryid', isAuthenticated, async (req, res) => {

  const { supplyid } = req.body;

  const newSurgerySupply = await PatientSurgerysController.pushPatientSurgerySupply({

    surgeryid: req.params.surgeryid,
    supplyid: supplyid,

  });

  let msg = 'No patient surgery supply was created for the patient';

  if (newSurgerySupply.result.n != 0) {

    msg = 'New patient surgery supply created succesfully';

  }

  res.status(201)
  res.send({ 'msg': msg });

});

module.exports = router;