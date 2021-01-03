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

   //get list of categories of one insurance

  router.get('/:insuranceid', isAuthenticated, async(req, res) => {

    const result = await InsuranceCategorysController.getCategorysByInsurance(req.params.insuranceid);
    res.send(result);

  })

  //delete category
  router.delete('/', isAuthenticated, async(req, res) => {

    const { categoryid } = req.body;

    const result = await InsuranceCategorysController.deleteInsuranceCategory(categoryid);

    let myResponse = {"msg": "No category was deleted"}

    if (result.result.n != 0){
  
      myResponse = {"msg": "The category was deleted"}
  
    }

    res.send(myResponse);


  })

  module.exports = router;