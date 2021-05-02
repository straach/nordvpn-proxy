var express = require('express');
var pkill = require('pkill');
const fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  try {
    const data = fs.readFileSync('/tmp/selected_country', 'utf8');
    res.send(data);
  } catch (err) {
    res.send('none');
  }
  
});

router.post('/', function(req, res, next) {
  try {
    console.log(req.body);
    const data = fs.writeFileSync('/tmp/selected_country',req.body.country, 'utf8');
    res.send(req.body.country);
    pkill('runsvdir');
  } catch (err) {
    res.send('none');
  }
});

module.exports = router;
