var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const MedicosController = require('./controller')

//Route to get medics list
router.get('/', isAuthenticated, async (req, res) => {

    const medicos = await MedicosController.getMedics();
    res.send(medicos);

});

//Route to medic log in
router.post('/login', isAuthenticated, async (req, res) => {

  const {mail, password } = req.body;

  const myresponse = await MedicosController.medicLogin(mail, password);

  res.send(myresponse);

});

//Route to get data from one medic (without the admin data)
router.get('/data', isAuthenticated, async (req, res) => {

  const { medicid } = req.body;

  const medico = await MedicosController.getMedic(medicid);

  var myResponse = {"msg": "User not found"};

  if (medico != null){

    myResponse = {

      "_id": medico._id,
      "name": medico.name,
      "surname": medico.surname,
      "mdNumber": medico.mdNumber,
      "mail": medico.mail
    }

  }

  res.send(myResponse);

});


//Route to create a new medic
router.post('/', isAuthenticated, async (req, res) => {
  const { name, surname, mdNumber, mail, password } = req.body;

  //Check if an user with that email exists

  const rta = await MedicosController.checkMedicExistence(mail);

  //if the user already exist, inform error

  if (rta == true){

    res.status(409)

    res.send({"msg": "The user already exists"});

    return;

  } else {

    //if it doesn't exist, create it

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
      res.send({"msg": "There was an error while creating the user"});
    }

  }
  
});

//Route to activate a medic
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

//Route to deactivate a medic
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

router.delete('/:medicid', isAuthenticated, async (req, res) => {

  const result = await MedicosController.deleteMedic(req.params.medicid);

  let myResponse = {"msg": "No user was deleted"}

  if (result.result.n != 0){

    myResponse = {"msg": "The user was deleted"}

  }

  res.send(myResponse);
});

//Route to update medic info
router.put('/:id', isAuthenticated, async (req, res) => {

  const { name, surname, mdNumber, mail, password } = req.body;

  let medicid = req.params.id;

  const newData = {
    "name": name,
    "surname": surname,
    "mdNumber": mdNumber,
    "mail": mail,
    "password": password
  }

  const stateResponse = await MedicosController.updateMedic(medicid, newData);

  let myResponse = {"msg": "No user was modifyed"}

  if (stateResponse.result.n != 0){

    myResponse = {"msg": "The user was modifyed"}

  }

  res.send(myResponse);

});


module.exports = router;