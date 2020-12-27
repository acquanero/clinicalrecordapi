var express = require('express');
const { MongoClient } = require('mongodb');
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

  router.delete('/', isAuthenticated, async(req, res) => {

    const { hospitalid } = req.body;

    const result = await HospitalsController.deleteHospital(hospitalid);

    let myResponse = {"msg": "No hospital was deleted"}

    if (result.result.n != 0){
  
      myResponse = {"msg": "The hospital was deleted"}
  
    }

    res.send(myResponse);


  })

  router.put('/:hospitalid', isAuthenticated, async(req, res) =>{

    let id = req.params.hospitalid;

    const { name, adress, phone } = req.body;

    const newData = {
      'name': name,
      'adress': adress,
      'phone': phone
    }

    const result = await HospitalsController.putHospital(id, newData);

    let myResponse = {"msg": "No hospital was modifyed"}
  
    if (result.result.n != 0){
  
      myResponse = {"msg": "The hospital was modifyed"}
  
    }
  
    res.send(myResponse);


  })

  module.exports = router;