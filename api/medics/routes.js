var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const MedicosController = require('./controller')

//Ruta para obtener el listado de medicos
router.get('/', isAuthenticated, async (req, res) => {

    const medicos = await MedicosController.getMedics();
    res.send(medicos);

});

//Ruta para crear un nuevo usuario medico
router.post('/', async (req, res) => {
  const { name, surname, mdNumber, mail, password } = req.body;

  //Chequeo si ya existe un usuario con ese mail

  const rta = await MedicosController.checkMedicExistence(mail);

  //si ya existe informo el error

  if (rta == true){

    res.status(409)

    res.send("The user already exists");

    return;

  } else {

    //si no existe, creo el nuevo usuario

    try {

      const newMedic = await MedicosController.pushMedic({
        name,
        surname,
        mdNumber,
        mail,
        password,
        admin: false,
        active: false
      });

      res.status(201)
      res.send({medicid: newMedic.ops[0]._id});

    } catch(e) {

      console.log(e);

      res.status(400)
      res.send("There was an error while creating the user")
    }

  }
  
});

//Ruta para activar un medico (dar de alta)
router.put('/activate', isAuthenticated, async (req, res) => {

  const { medicid } = req.body;
  const stateResponse = await MedicosController.activateMedic(medicid);
  var msgResponse = "";

  if (stateResponse.result.nModified == 0){
    msgResponse = "No user was activated";
  } else {
    msgResponse = "The user was activated";
  }

  res.send({"msg": msgResponse});

});

//Ruta para activar un medico (dar de alta)
router.put('/deactivate', isAuthenticated, async (req, res) => {

  const { medicid } = req.body;
  const stateResponse = await MedicosController.deactivateMedic(medicid);
  var msgResponse = "";
  if (stateResponse.result.nModified == 0){
    msgResponse = "No user was deactivated";
  } else {
    msgResponse = "The user was deactivated";
  }

  res.send({"msg": msgResponse});

});


module.exports = router;