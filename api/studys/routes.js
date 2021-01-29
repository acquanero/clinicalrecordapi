var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const dateConverter = require('../../myutils/dateConverter');

const StudysController = require('./controller')

//endpoint to creat a patient study
router.post('/', isAuthenticated, async (req, res) => {

    const { patientid, date, description } = req.body;

    const newStudy = {

        "patientid": patientid,
        "date": dateConverter.dateConverter(date),
        "description": description
    };

    const result = await StudysController.pushStudy(newStudy);

    let msg = 'No study was created';

    if (result.result.n != 0) {

        msg = 'Study created succesfully';

    }

    res.status(201)
    res.send({ 'msg': msg });

})

//endpoint to get list of patient studies

router.get('/:patientid', isAuthenticated, async(req, res) =>{

    const studys = await StudysController.getStudys(req.params.patientid);

    res.send(studys);

})

//endpoint to delete patient study

router.delete('/:studyid', isAuthenticated, async(req, res) => {

    const result = await StudysController.deleteStudy(req.params.studyid);

    let msg = 'No study was deleted';

    if (result.result.n != 0) {

        msg = 'The study was deleted';

    }
    res.send({ 'msg': msg });


})

module.exports = router;