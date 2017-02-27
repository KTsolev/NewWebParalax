/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'web-app',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

//  ENV.contentSecurityPolicy = {
//    'script-src': "'self' 'unsafe-eval' https://*.googleapis.com https://maps.gstatic.com",
//    'img-src': "'self' https://*.googleapis.com https://*.gstatic.com",
//    'font-src': "'self' https://*.gstatic.com",
//    'style-src': "'self' 'unsafe-inline' https://*.googleapis.com"
//  };

//  ENV.googleMap = {
//    apiKey: 'AIzaSyD-gQT1wxuPKegcI_lMSf1_3p8kTcE_5k8'
//  //libraries: ['drawing', 'visualization'],
//  //protocol: '//', // default
//  //lazyLoad: true, // default
//  //language: 'bg', // optional
//  //region: 'BG' // optional
//  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
