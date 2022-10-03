// html pdf
// linkはダメでstyleは直接読み込みで可能
// https://www.npmjs.com/package/html-pdf?activeTab=readme

var express = require('express');
var router = express.Router();

var fs = require('fs');
const puppeteer = require('puppeteer');

var html = fs.readFileSync('html/sample/index.html', 'utf8');

/* GET users listing. */
router.get('/', async function(req, res, next) {
   // Get type of source from process.argv, default to url
  //  var type = process.argv.slice(2)[0] || 'url';

   // or
   // ブラウザを起動する時点で指定しておく
   const browser = await puppeteer.launch({
       defaultViewport: {
           width: 1440,
           height: 900,
       }
   });
   // Create a new page
   const page = await browser.newPage();
 
   // Create a browser instance
    page.setViewport({ width: 1440, height: 900 }); // ビューポート (ウィンドウサイズ)
 
     //Get HTML content from HTML file
    //  const html = fs.readFileSync('sample.html', 'utf-8');


    html = html.replace( '{{hogehoge}}', 'zazarara' );

    let array1 = [
      {
        id: 1,
        name: '商品名',
        unit: '単位',
        num: '数量',
        unitPrice: "単価",
        money: "金額"
      },
      {
        id: 2,
        name: '商品名1',
        unit: '単位1',
        num: '数量1',
        unitPrice: "単価1",
        money: "金額1"
      }
    ]

    let list = '';
    array1.forEach(element => {
      list += '<p class="order__list-li">' + element.id +'</p>';
      list += '<p class="order__list-li">' + element.name +'</p>';
      list += '<p class="order__list-li">' + element.unit +'</p>';
      list += '<p class="order__list-li">' + element.num +'</p>';
      list += '<p class="order__list-li">' + element.unitPrice +'</p>';
      list += '<p class="order__list-li">' + element.money +'</p>';
    });
    html = html.replace( '{{list}}', list );




     await page.setContent(html, { waitUntil: 'domcontentloaded' });

      
   // To reflect CSS used for screens instead of print
   await page.emulateMediaType('screen');
 
   // Downlaod the PDF
   const pdf = await page.pdf({
     path: `result.pdf`,
    //  margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
     printBackground: true,
     format: 'A4',
   });
 
   // Close the browser instance
   await browser.close();
});

module.exports = router;