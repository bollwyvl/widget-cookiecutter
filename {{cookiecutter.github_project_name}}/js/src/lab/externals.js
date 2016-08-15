/*
  this can be any kind of valid webpack `externals` config:
  https://webpack.github.io/docs/configuration.html#externals

  This allows extenders of your extension to reuse your code with a normal
  npm install, but _not_ bundle it with webpack.

  We'll look at your package.json and make sure that you aren't bundling any
  other extensions.

  If you're not doing anything fancy, remove this
  (and package.json:jupyter/lab/externals)
*/
module.exports = [];
