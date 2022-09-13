// html pdf
// linkはダメでstyleは直接読み込みで可能
// https://www.npmjs.com/package/html-pdf?activeTab=readme

var express = require('express');
var router = express.Router();

var fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;

var html = fs.readFileSync('./html/sample/index.html', 'utf8');

/* GET users listing. */
router.get('/', function(req, res, next) {

 // PDFDocument オブジェクト生成
  // PDF出力先をカレントフォルダの doc1.pdf に設定
  doc.pipe(fs.createWriteStream('pdfkit.pdf'));
  // x=10、y=10 の位置に文字列「doc1」を印字
  doc.text('pdfkit',10,10);
  // ファイナライズ・PDF出力
  doc.end();

  res.send('respond with a resource');
});

module.exports = router;