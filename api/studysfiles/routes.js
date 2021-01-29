var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');
const StudysFilesController = require('./controller')

//endpoint to creat a file entry associated to a study

router.post('/', isAuthenticated, async (req, res) => {

    const { belongingid, url } = req.body;

    const newFile = {

        "belongingid": belongingid,
        "url": url
    };

    const result = await StudysFilesController.pushStudyFile(newFile);

    let msg = 'No file entry was created';

    if (result.result.n != 0) {

        msg = 'File entry created succesfully';

    }

    res.status(201)
    res.send({ 'msg': msg });

})


module.exports = router;