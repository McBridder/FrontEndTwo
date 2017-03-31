var webpack = require('webpack');
var path = require('path');


var config = {
  context: __dirname + '/app', // `__dirname` is root of project and `app` is source
  entry: {
    app: __dirname + '/app/js/index.js',
  },
  output: {
    path: __dirname + '/app/js', // `dist` is the destination
    filename: 'bundle.js',
  },
  watch: true
};

module.exports = config;