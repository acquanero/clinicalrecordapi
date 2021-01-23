var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const PathologysController = require('./controller')

//Route to create a new pathology
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newPathology = await PathologysController.pushPathology({
        name
      });

      let msg = 'No pathology was created';

      if (newPathology.result.n != 0 ) {

        msg = 'Pathology created succesfully';

      }

      res.status(201);
      res.send({'msg': msg});
    
  });

    //Route to gel list of pathologies

    router.get('/', isAuthenticated, async(req, res) => {

      const pathologys = await PathologysController.getPathologys();
      res.send(pathologys);
  
    })

    //modify pathology name

    router.put('/:pathologyid', isAuthenticated, async(req, res) =>{

      let id = req.params.pathologyid;
  
      const { name } = req.body;
  
      const result = await PathologysController.putPathology(id, name);
  
      let myResponse = {"msg": "No pathology was modifyed"}
    
      if (result.result.n != 0){
    
        myResponse = {"msg": "The pathology was modifyed"}
    
      }
    
      res.send(myResponse);
  
  
    })

  module.exports = router;