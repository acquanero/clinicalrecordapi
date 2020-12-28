var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const InsurancesController = require('./controller')

//Route to create a new hospital
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newInsurance = await InsurancesController.pushInsurance({
        name
      });

      let msg = 'No insurance was created';

      if (newInsurance.result.n != 0 ) {

        msg = 'Insurance created succesfully';

      }

      res.status(201)
      res.send({'msg': msg});
    
  });

  module.exports = router;