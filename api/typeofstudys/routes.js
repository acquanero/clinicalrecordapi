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

//modify type of study name

router.put('/:typeofstudyid', isAuthenticated, async (req, res) => {

    let id = req.params.typeofstudyid;

    const { name } = req.body;

    const result = await TypeOfStudysController.putTypeOfStudy(id, name);

    let myResponse = { "msg": "No type of study was modifyed" }

    if (result.result.n != 0) {

        myResponse = { "msg": "The type of study name was modifyed" }

    }

    res.send(myResponse);


})

//endpoint to delete a type of study
router.delete('/:typeofstudyid', isAuthenticated, async (req, res) => {

    const result = await TypeOfStudysController.deleteTypeOfStudy(req.params.typeofstudyid);

    let msg = 'No evolutype of study was deleted';

    if (result.result.n != 0) {

        msg = 'Type of study deleted';

    }
    res.send({ 'msg': msg });
});


module.exports = router;