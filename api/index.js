var express = require('express');
var router = express.Router();

const medics = require('./medics/routes');
const hospitals = require('./hospitals/routes');
const insurances = require('./insurances/routes');
const typeofsugerys = require('./typeofsurgerys/routes');
const pathologys = require('./pathologys/routes');
const supplys = require('./supplys/routes');
const insurancecategorys = require('./insurancecategorys/routes');
const diseases = require('./diseases/routes');
const medications = require('./medications/routes');
const patients = require('./patients/routes');
const surgerys = require('./surgerys/routes');
const evolutions = require('./evolutions/routes');
const biopsys = require('./biopsys/routes');
const officecontrols = require('./officecontrols/routes');
const typeofstudys = require('./typeofstudys/routes');

router.use('/medics', medics);
router.use('/hospitals', hospitals);
router.use('/insurances', insurances);
router.use('/typeofsurgerys', typeofsugerys);
router.use('/pathologys', pathologys);
router.use('/supplys', supplys);
router.use('/insurancecategorys', insurancecategorys);
router.use('/diseases', diseases);
router.use('/medications', medications);
router.use('/patients', patients);
router.use('/surgerys', surgerys);
router.use('/evolutions', evolutions);
router.use('/biopsys', biopsys);
router.use('/officecontrols', officecontrols);
router.use('/typeofstudys', typeofstudys);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clinical Record API' });
});

module.exports = router;
