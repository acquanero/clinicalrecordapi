var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const SurgeryTypeController = require('./controller')

//Route to create a new surgery type
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newSurgery = await SurgeryTypeController.pushSurgery({
        name
      });

      let msg = 'No surgery was created';

      if (newSurgery.result.n != 0 ) {

        msg = 'New surgery created succesfully';

      }

      res.status(201)
      res.send({'msg': msg});
    
  });

  router.get('/', isAuthenticated, async(req, res) => {

    const result = await SurgeryTypeController.getSurgerys();
    res.send(result);

  });

  router.put('/:typeofsurgeryid', isAuthenticated, async(req, res) =>{

    let id = req.params.typeofsurgeryid;

    const { name } = req.body;

    const result = await SurgeryTypeController.putSurgery(id, name);

    let myResponse = {"msg": "No surgery was modifyed"}
  
    if (result.result.n != 0){
  
      myResponse = {"msg": "The surgery name was modifyed"}
  
    }
  
    res.send(myResponse);


  });

  module.exports = router;