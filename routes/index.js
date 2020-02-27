var express = require('express');
var router = express.Router();

const example = require('../sample.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'serialize', data: JSON.stringify(example)});
});

module.exports = router;
