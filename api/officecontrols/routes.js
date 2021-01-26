var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const OfficeControlsController = require('./controller')

//endpoint to creat a patient evolution
router.post('/', isAuthenticated, async (req, res) => {

    const { patientid, medicid, date, description } = req.body;

    const newOfficeControl = {

        "patientid": patientid,
        "medicid": medicid,
        "date": dateConverter.dateConverter(date),
        "description": description
    };

    const result = await OfficeControlsController.pushOfficeControl(newOfficeControl);

    let msg = 'No office evolution was created';

    if (result.result.n != 0) {

        msg = 'office evolution created succesfully';

    }

    res.status(201)
    res.send({ 'msg': msg });

});

//endpoint to get all patient office controls

router.get('/:patientid', isAuthenticated, async (req, res) => {

    const officecontrols = await OfficeControlsController.getPatientOfficeControls(req.params.patientid);

    res.send(officecontrols);
})

//endpoint to delete one office control

router.delete('/:officecontrolid', isAuthenticated, async(req, res) => {

    const result = await OfficeControlsController.deletePatientOfficeControl(req.params.officecontrolid);

    let msg = 'No office control was deleted';

    if (result.result.n != 0) {

        msg = 'Office control deleted';

    }

    res.status(201)
    res.send({ 'msg': msg });
})

module.exports = router;