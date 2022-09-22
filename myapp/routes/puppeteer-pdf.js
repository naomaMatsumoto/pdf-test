// html pdf
// linkはダメでstyleは直接読み込みで可能
// https://www.npmjs.com/package/html-pdf?activeTab=readme

var express = require('express');
var router = express.Router();

var fs = require('fs');
var pdf = require('html-pdf');
const puppeteer = require('puppeteer');

var html = fs.readFileSync('html/sample/index.html', 'utf8');

/* GET users listing. */
router.get('/', async function(req, res, next) {
   // Get type of source from process.argv, default to url
  //  var type = process.argv.slice(2)[0] || 'url';

   // Create a browser instance
   const browser = await puppeteer.launch();
 
   // Create a new page
   const page = await browser.newPage();
 
 
 
 
     //Get HTML content from HTML file
    //  const html = fs.readFileSync('sample.html', 'utf-8');
     await page.setContent(html, { waitUntil: 'domcontentloaded' });

     
     console.log(new Error(`HTML source is unkown.`));
 
   // To reflect CSS used for screens instead of print
   await page.emulateMediaType('screen');
 
   // Downlaod the PDF
   const pdf = await page.pdf({
     path: `result.pdf`,
     margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
     printBackground: true,
     format: 'A4',
   });
 
   // Close the browser instance
   await browser.close();
});

module.exports = router;