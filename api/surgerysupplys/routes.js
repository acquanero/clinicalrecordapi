var express = require('express');
var router = express.Router();
const isAuthenticated = require('../../auth');

const SupplysController = require('./controller')

//Route to create a new supply
router.post('/', isAuthenticated, async (req, res) => {

    const { name } = req.body;

    const newSupply = await SupplysController.pushSupply({
        name
    });

    let msg = 'No supply was created';

    if (newSupply.result.n != 0) {

        msg = 'Supply created succesfully';

    }

    res.status(201);
    res.send({ 'msg': msg });

});

//Route to gel list of supplies

router.get('/', isAuthenticated, async (req, res) => {

    const supplys = await SupplysController.getSupplys();
    res.send(supplys);

})

//modify supply name

router.put('/:surgerysupplyid', isAuthenticated, async (req, res) => {

    let id = req.params.surgerysupplyid;

    const { name } = req.body;

    const result = await SupplysController.putSupply(id, name);

    let myResponse = { "msg": "No supply was modifyed" }

    if (result.result.n != 0) {

        myResponse = { "msg": "The supply name was modifyed" }

    }

    res.send(myResponse);


})

module.exports = router;