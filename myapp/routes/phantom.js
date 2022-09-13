// https://www.npmjs.com/package/phantom-html-to-pdf
var express = require('express');
var router = express.Router();
var fs = require('fs')
var conversion = require("phantom-html-to-pdf")();
var html = fs.readFileSync('./html/sample/index.html', 'utf8');

/* GET users listing. */
router.get('/', function(req, res, next) {

  conversion({ html }, function(err, pdf) {
    var output = fs.createWriteStream('./phantom.pdf')
    console.log(pdf.logs);
    console.log(pdf.numberOfPages);
    // since pdf.stream is a node.js stream you can use it
    // to save the pdf to a file (like in this example) or to
    // respond an http request.
    pdf.stream.pipe(output);
    res.send('respond with a resource');

  });


  console.log(status); // { filename: '/app/businesscard.pdf' }
  console.log('Page Rendered');
  res.send('respond with a resource');

});

module.exports = router;