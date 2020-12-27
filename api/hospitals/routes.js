var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const HospitalsController = require('./controller')

//Route to create a new hospital
router.post('/', isAuthenticated, async (req, res) => {

    const { name, adress, phone } = req.body;

    const newHospital = await HospitalsController.pushHospital({
        name,
        adress,
        phone
      });

      let msg = 'No hospital was created';

      if (newHospital.result.n != 0 ) {

        msg = 'Hospital created succesfully';

      }

      res.status(201)
      res.send({'msg': msg});
    
  });
  

  router.get('/', isAuthenticated, async(req, res)=>{

    const hospitals = await HospitalsController.getHospitals();
    res.send(hospitals);

  })

  module.exports = router;