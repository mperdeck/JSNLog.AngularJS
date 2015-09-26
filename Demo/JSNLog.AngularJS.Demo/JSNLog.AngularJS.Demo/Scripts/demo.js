// To log client side errors on the server,
// * install JSNLog - see http://www.nuget.org/packages?q=jsnlog
// * load logToServer.js before loading your main module
// * inject module 'logToServer' into your main module
// * add 'logToServerInterceptor' to the interceptor pipeline 
// * pass the timeout and warningAfter time to $http (see further below).
//
// Details on how this all works are at
// http://jsnlog.com/Documentation/GetStartedLogging/AngularJsErrorHandling

// This particular demo uses Elmah on the server to do the logging.
// But if you use some other package (Log4Net, NLog, Serilog, etc.)
// you can have JSNLog talking to that package as well.
// Simply install the matching version from NuGet
// http://www.nuget.org/packages?q=jsnlog

var app = angular.module('demoModule', ['logToServer']);

app.controller('DemoController', ['$http', DemoController]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
}]);

function DemoController($http) {
    this._$http = $http;
}

var showSuccessMessage = function (message) {
    $('#message').text(message).css("color", 'green');
}

var showErrorMessage = function (message) {
    $('#message').text(message).css("color", 'red');
}

DemoController.prototype.throw = function () {
    // Cause exception by accessing unknown variable
    var x = xyz;
};

DemoController.prototype.sendWait = function (ms) {
    showSuccessMessage('');
    $('#spinner').show();

    var url = '/api/wait/' + ms;
    var config = { timeout: 5000, warningAfter: 2000 };

    this._$http.get(url, config)
      .then(function(response) {
          showSuccessMessage(response.data);
      })
      .catch(function (rejection) {
          var message = 'timed out';
          if (rejection && rejection.data) {
              message = rejection.data.ExceptionMessage;
          }

          showErrorMessage(message);
      })
      .finally(function() {
          $('#spinner').hide();
      });
};

