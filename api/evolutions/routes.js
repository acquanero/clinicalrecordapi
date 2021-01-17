var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const EvolutionsController = require('./controller')

//endpoint to creat a patient evolution
router.post('/', isAuthenticated, async(req, res) => {

    const { patientid, medicid, date, description } = req.body;

    const newEvolution = {

        "patientid": patientid,
        "medicid": medicid,
        "date": dateConverter.dateConverter(date),
        "description": description
    };

    const result = await EvolutionsController.pushEvolution(newEvolution);

    let msg = 'No evolution was created';

    if (result.result.n != 0) {
  
      msg = 'Evolution created succesfully';
  
    }
  
    res.status(201)
    res.send({ 'msg': msg });

})

//endpoint to get all patient evolutions

router.get('/:patientid', isAuthenticated, async(req, res) => {

    const evolutions = await EvolutionsController.getPatientEvolutions(req.params.patientid);

    res.send(evolutions);
})

module.exports = router;