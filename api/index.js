var express = require('express');
var router = express.Router();

const medics = require('./medics/routes');
const hospitals = require('./hospitals/routes');
const insurances = require('./insurances/routes');
const sugerys = require('./surgerys/routes');
const pathologys = require('./pathologys/routes');
const supplys = require('./supplys/routes');

router.use('/medics', medics);
router.use('/hospitals', hospitals);
router.use('/insurances', insurances);
router.use('/surgerys', sugerys);
router.use('/pathologys', pathologys);
router.use('/supplys', supplys);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clinical Record API' });
});

module.exports = router;
