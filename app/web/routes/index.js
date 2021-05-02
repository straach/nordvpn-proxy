var express = require('express');
const fs = require('fs');
var router = express.Router();


router.get('/isup', function (req, res, next) {
  res.send('yes');
});

router.get('/', function (req, res, next) {
  try {
    const jsonString = fs.readFileSync('/tmp/servers_countries', 'utf8');
    const data = JSON.parse(jsonString)
      .map(({ name, code }) => ({ name, code }));
    res.render('index', { data });
  } catch (err) {
    res.send(err);
  }
});


module.exports = router;
