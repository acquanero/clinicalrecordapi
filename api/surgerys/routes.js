var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const SurgerysController = require('./controller')

//Route to create a new surgery type
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newSurgery = await SurgerysController.pushSurgery({
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

    const result = await SurgerysController.getSurgerys();
    res.send(result);

  })

  module.exports = router;