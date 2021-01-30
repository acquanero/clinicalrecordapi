var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const LaboratorysController = require('./controller')

//endpoint to creat a patient laboratory
router.post('/', isAuthenticated, async (req, res) => {

    const { patientid, date, description, urlstofiles } = req.body;

    const newLaboratory = {

        "patientid": patientid,
        "date": dateConverter.dateConverter(date),
        "description": description,
        "urlstofiles": urlstofiles
    };

    const result = await LaboratorysController.pushLaboratory(newLaboratory);

    let msg = 'No laboratory was created';

    if (result.result.n != 0) {

        msg = 'Labporatory created succesfully';

    }

    res.status(201)
    res.send({ 'msg': msg });

})

//endpoint to get list of patient laboratories

router.get('/:patientid', isAuthenticated, async(req, res) =>{

    const laboratorys = await LaboratorysController.getLaboratorys(req.params.patientid);

    res.send(laboratorys);

})

//endpoint to delete patient laboratory

router.delete('/:laboratoryid', isAuthenticated, async(req, res) => {

    const result = await LaboratorysController.deleteLaboratory(req.params.laboratoryid);

    let msg = 'No laboratory was deleted';

    if (result.result.n != 0) {

        msg = 'The laboratory was deleted';

    }
    res.send({ 'msg': msg });


})

module.exports = router;