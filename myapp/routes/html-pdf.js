// html pdf
// linkはダメでstyleは直接読み込みで可能
// https://www.npmjs.com/package/html-pdf?activeTab=readme

var express = require('express');
var router = express.Router();

var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./html/sample/index.html', 'utf8');
var options = { format: 'Letter' };

/* GET users listing. */
router.get('/', function(req, res, next) {
  pdf.create(html, options).toFile('./html-pdf.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
  res.send('respond with a resource');
});

module.exports = router;