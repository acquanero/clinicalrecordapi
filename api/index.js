var express = require('express');
var router = express.Router();

const medics = require('./medics/routes');

router.use('/medics', medics);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clinical Record API' });
});

module.exports = router;
