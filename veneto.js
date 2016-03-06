
var cheerio = require('cheerio');

var Veneto = {
  parse: parse
}


function parse (htmlStr) {
  $ = cheerio.load(htmlStr);

  // Detect repetitive elements
  // For the current prototype,
  // just do this process in arbitrary way
  var user = $('.user');
  $('.name', user).text("{user.name}")
  $('.about', user).text("{user.about}")








}



module.exports = Veneto;

