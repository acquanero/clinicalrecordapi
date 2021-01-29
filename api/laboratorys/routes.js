var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const LaboratorysController = require('./controller')

//endpoint to creat a patient laboratory
router.post('/', isAuthenticated, async (req, res) => {

    const { patientid, date, description } = req.body;

    const newLaboratory = {

        "patientid": patientid,
        "date": dateConverter.dateConverter(date),
        "description": description
    };

    const result = await LaboratorysController.pushLaboratory(newLaboratory);

    let msg = 'No laboratory was created';

    if (result.result.n != 0) {

        msg = 'Labporatory created succesfully';

    }

    res.status(201)
    res.send({ 'msg': msg });

})

module.exports = router;