var pkg = require('./package.json');
var version = pkg.version;

  var jlab_helpers = require('jupyterlab/scripts/extension_helpers');

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var loaders = [
    { test: /\.json$/, loader: 'json-loader' },
];


module.exports = [
    {// Notebook extension
     //
     // This bundle only contains the part of the JavaScript that is run on
     // load of the notebook. This section generally only performs
     // some configuration for requirejs, and provides the legacy
     // "load_ipython_extension" function which is required for any notebook
     // extension.
     //
        entry: './src/notebook/extension.js',
        output: {
            filename: 'notebook-extension.js',
            path: '../{{ cookiecutter.python_package_name }}/static',
            libraryTarget: 'amd'
        }
    },
    {// JupyterLab extension
         //
         // This bundle only contains the part of the JavaScript that is run on
         // load of JupyterLab.
         // https://github.com/jupyter/jupyterlab/blob/master/tutorial/extensions.md
         //
            entry: './src/lab/extension.js',
            output: {
                filename: 'lab-extension.js',
                path: '../{{ cookiecutter.python_package_name }}/static',
                libraryTarget: 'this'
            },
            // this ensures you don't bundle JupyterLab, Phosphor, and any
            // extensions on which you depend.
            externals: jlab_helpers.upstream_externals(require)
    },
    {// Bundle for the notebook containing the custom widget views and models
     //
     // This bundle contains the implementation for the custom widget views and
     // custom widget.
     // It must be an amd module
     //
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: '../{{ cookiecutter.python_package_name }}/static',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    },
    {// Embeddable {{ cookiecutter.npm_package_name }} bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by npmcdn to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: './dist/',
            libraryTarget: 'amd',
            publicPath: 'https://npmcdn.com/{{ cookiecutter.npm_package_name }}@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    }
];
