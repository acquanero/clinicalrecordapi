var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const InsuranceCategorysController = require('./controller')

//Route to create a new hospital
router.post('/', isAuthenticated, async (req, res) => {

    const { insuranceid, name } = req.body;

    const newInsuranceCategory = await InsuranceCategorysController.pushInsuranceCategory({
        insuranceid,
        name
      });

      let msg = 'No insurance category was created';

      if (newInsuranceCategory.result.n != 0 ) {

        msg = 'Insurance category created succesfully';

      }

      res.status(201)
      res.send({'msg': msg});
    
  });

  //get list of insurances categories

  router.get('/', isAuthenticated, async(req, res)=>{

    const categories = await InsuranceCategorysController.getInsuranceCategorys();
    res.send(categories);

  })

  module.exports = router;