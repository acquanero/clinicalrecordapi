var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const InsurancesController = require('./controller')

//Route to create a new insurance
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newInsurance = await InsurancesController.pushInsurance({
        name
      });

      let msg = 'No insurance was created';

      if (newInsurance.result.n != 0 ) {

        msg = 'Insurance created succesfully';

      }

      res.status(201);
      res.send({'msg': msg});
    
  });

  //Route to gel list of insurances

  router.get('/', isAuthenticated, async(req, res) => {

    const insurances = await InsurancesController.getInsurances();
    res.send(insurances);

  })

  router.delete('/:insuranceid', isAuthenticated, async(req, res) => {

    const result = await InsurancesController.deleteInsurance(req.params.insuranceid);

    let myResponse = {"msg": "No insurance was deleted"}

    if (result.result.n != 0){
  
      myResponse = {"msg": "The insurance was deleted"}
  
    }
  
    res.send(myResponse);

  })

  module.exports = router;