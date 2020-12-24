var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const MedicosController = require('./controller')

//Ruta para obtener el listado de medicos
router.get('/', isAuthenticated, async (req, res) => {

    const medicos = await MedicosController.getMedicos();
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

      const newMedic = await MedicosController.pushMedico({
        name,
        surname,
        mdNumber,
        mail,
        password,
        admin: false,
        active: false
      });

      res.status(201)
      res.send({id: newMedic.ops[0]._id});

    } catch(e) {

      console.log(e);

      res.status(400)
      res.send("Hubo un error")
    }

  }
  
});


module.exports = router;