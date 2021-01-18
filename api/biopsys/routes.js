var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');
const dateConverter = require('../../myutils/dateConverter');
const BiopsysController = require('./controller')

//endpoint to creat a patient biopsy
router.post('/', isAuthenticated, async (req, res) => {

    const { patientid, date, description } = req.body;

    const newBiopsy = {

        "patientid": patientid,
        "date": dateConverter.dateConverter(date),
        "description": description
    };

    const result = await BiopsysController.pushBiopsy(newBiopsy);

    let msg = 'No biopsy was created';

    if (result.result.n != 0) {

        msg = 'Biopsy created succesfully';

    }

    res.status(201)
    res.send({ 'msg': msg });

})

//endpoint to get list of patient biopsies

router.get('/:patientid', isAuthenticated, async(req, res) =>{

    const biopsies = await BiopsysController.getPatientBiopsys(req.params.patientid);

    res.send(biopsies);

})

module.exports = router;
