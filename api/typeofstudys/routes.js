var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const TypeOfStudysController = require('./controller')

//Route to create a new type of study
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newSupply = await TypeOfStudysController.pushTypeOfStudy({
        name
    });

    let msg = 'No type of study was created';

    if (newSupply.result.n != 0) {

        msg = 'Type of study created succesfully';

    }

    res.status(201);
    res.send({ 'msg': msg });

});

//Route to gel list of type of studies

router.get('/', isAuthenticated, async (req, res) => {

    const supplys = await TypeOfStudysController.getTypeOfStudys();
    res.send(supplys);

})


module.exports = router;