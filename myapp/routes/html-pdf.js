var express = require('express');
var router = express.Router();


var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./test/html-pdf/index.html', 'utf8');
var options = { format: 'Letter' };

/* GET users listing. */
router.get('/', function(req, res, next) {
  pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
  res.send('respond with a resource');
});

module.exports = router;
