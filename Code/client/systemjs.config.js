/* global System */
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular': 'node_modules/@angular',
        'rxjs': 'node_modules/rxjs',
        'angular2-toaster': 'node_modules/angular2-toaster',
        'angular2-modal': 'node_modules/angular2-modal',
        'ng-lightning': 'node_modules/ng-lightning'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            main: 'main.js',
            defaultExtension: 'js'
        },
        'rxjs': {
            defaultExtension: 'js'
        },
        'esri-mods': {
            defaultExtension: 'js'
        },
        'angular2-toaster': {
            defaultExtension: 'js'
        },
        'angular2-modal': {
            defaultExtension: 'js',
            main: 'index.js'
        },
        'angular2-modal/platform-browser': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'angular2-modal/plugins/bootstrap': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'ng-lightning': {
            main: 'ng-lightning.js',
            defaultExtension: 'js'
        }
    }
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];
    // Add package entries for angular packages
    ngPackageNames.forEach(function(pkgName) {
        packages['@angular/' + pkgName] = {
            main: pkgName + '.umd.js',
            defaultExtension: 'js'
        };
    });
    var config = {
        map: map,
        packages: packages,
        paths: {
            'tether': 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.js',
            'ts-helpers': 'node_modules/ng-lightning/node_modules/ts-helpers/index.js'
        }
    }
    System.config(config);
})(this);
