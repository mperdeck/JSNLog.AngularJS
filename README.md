# Logging and JavaScript error handling for AngularJS

## logToServer.js

* Replaces standard AngularJS [$log](https://docs.angularjs.org/api/ng/service/$log) to version that logs to the server, and optionally to the console using a [consoleAppender](http://jsnlog.com/Documentation/WebConfig/JSNLog/ConsoleAppender).
* Replaces AngularJS [$exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler) with version that logs JavaScript exceptions to the server.
* Provides [Interceptors](https://docs.angularjs.org/api/ng/service/$http#interceptors) to log AJAX errors and timeouts to the server, and to log warning messages when AJAX responses are slow.

## How to use

[Install the JSNLog JavaScript Logging Package](http://jsnlog.com/). Copy logToServer.js to your site and load it into your pages, such as with a script tag.

To use the new $log and $exceptionHandler, simply import module _logToServer_ into your main module, like so:
```
var app = angular.module('mainmodule', ['logToServer']);
```

To use the interceptors, add them to the interceptors array for your application:
```
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
}]);
```

When you call $http to send an AJAX message, set the timeout and the delay after which a warning log message is sent in milliseconds in the config object, using _timeout_ and _warningAfter_:
```
$http({ method: '...', url: '...', data: ..., timeout: 5000, warningAfter: 2000 })
.success(function (data, status, headers, config) {
	...
})
.error(function (data, status, headers, config) {
	...
});
```

[More about AngularJS Error Handling](http://jsnlog.com/Documentation/GetStartedLogging/AngularJsErrorHandling)

