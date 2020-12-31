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

  module.exports = router;