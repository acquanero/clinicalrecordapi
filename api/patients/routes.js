var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const myutils = require('../../myutils');

const PatientsController = require('./controller')

//Route to create a new patient
router.post('/', isAuthenticated, async (req, res) => {

  const { name, surname, dni, birthdate, insurance, insurancecategory, adress, mail, phone, hospital, inpatient } = req.body;

  const newPatient = await PatientsController.pushPatient({
    name,
    surname,
    dni,
    birthdate,
    insurance,
    insurancecategory,
    adress,
    mail,
    phone,
    hospital,
    inpatient
  });

  let msg = 'No patient was created';

  if (newPatient.result.n != 0) {

    msg = 'Patient created succesfully';

  }

  res.status(201)
  res.send({ 'msg': msg });

});


// Crear paciente
router.post('/', isAuthenticated, async (req, res) => {

    // Convierto la fecha de string dd-mm-yyyy a formato Date de Mongo
  
    const birth = req.body.birthdate.split('-');
    const fechaString = `${birth[2]}-${birth[1]}-${birth[0]}T00:00:00Z`;
    const nacimientoDate = new Date(fechaString);
  
    const result = await PatientsController.pushPatient({
        name: req.body.nombre,
        surname: req.body.apellido,
        dni: req.body.dni,
        birthdate: nacimientoDate,
        insurance: req.body.insurance,
        insurancecategory: req.body.insurancecategory,
        adress: req.body.insurance,
        mail: req.body.mail,
        phone: req.body.phone,
        hospital: req.body.hospital,
        inpatient: req.body.inpatient
    });
  
    let msg = 'No patient was created';

    if (result.result.n != 0) {
  
      msg = 'Patient created succesfully';
  
    }
  
    res.status(201)
    res.send({ 'msg': msg });

  });

module.exports = router;