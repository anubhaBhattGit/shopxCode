/* jshint node: true, -W024, -W069 */

'use strict';

module.exports = function() {
    var client = 'app';
    var root = './';
    var sassCache = './.sass-cache/';
    var temp = './app/.tmp/';
    var wiredep = require('wiredep');
    var assets = 'assets';
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var config = {
        /**
         * File paths
         */
        // all javascript that we want to vet
        allAppJs: [
            client + '/**/*.module.js',
            client + '/**/*.route.js',
            client + '/**/*.run.js',
            client + '/**/*.service.js',
            client + '/**/*.model.js',
            client + '/**/*.controller.js',
            client + '/**/*.directive.js',
            client + '/**/*.constant.js'
        ],
        allLibjs : [
            assets + '/libs/jquery.min.js',
            assets + '/libs/bootstrap.min.js',
            assets + '/libs/angular.min.js',
            assets + '/libs/angular-ui-router.min.js'
        ],
        allLibCss : [
            assets + '/libs/*.css'
        ],
        build: './build/',
        client: client,
        css: temp + 'app.css',
        fonts: './bower_components/bootstrap/dist/fonts/**/*.*',
        html: client + '**/*.html',
        htmltemplates: client + '**/*.html',
        images: client + 'images/**/*.*',
        index: client + '**/index.html',
        js: [
            client + 'components/**/*.module.js',
            client + 'components/**/*.js'
        ],
        sass: assets + '/**/*.scss',
        sassRoot: assets + '/styles/app.scss',
        root: root,
        sassCache: sassCache,
        serverOptions : {
            directoryListing: {
                enable : true,
                path : root
            },
            open : true,
            port : 3000,
            https : false,
        },
        source: 'src/',
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.min.js',
            lib: 'lib.min.js',
            css: 'css.min.css'
        },

        /**
         * plato
         */
        plato: {js: client + '**/*.js'},

        /**
         * browser sync
         */
        browserReloadDelay: 1000,

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: '',
                standAlone: false
            }
        },

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '..'
        },
        packages: [
            './package.json',
            './bower.json'
        ],
        /**
         * Node settings
         */
    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json
        };
        return options;
    };

    return config;
};
