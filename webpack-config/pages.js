const glob = require('glob');
const config = require('./config');

var pages = glob.Glob('!(_)*', {
  sync: true,
  cwd: config.srcDir
}).found;

module.exports = pages;