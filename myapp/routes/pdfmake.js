// html pdf
// linkはダメでstyleは直接読み込みで可能
// https://www.npmjs.com/package/html-pdf?activeTab=readme

var express = require('express');
var router = express.Router();

var fs = require('fs');
var html = fs.readFileSync('./html/sample/index.html', 'utf8');

var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// var htmlToPdfmake = require("html-to-pdfmake");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var docDefinition = {
    content: [
      html
    ]
  };
  
  var pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getBuffer(function(buffer) {
    fs.writeFileSync('example.pdf', buffer);
  });
  res.send('respond with a resource');
});

module.exports = router;