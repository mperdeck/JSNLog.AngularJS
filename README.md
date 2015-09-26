# Logging and JavaScript error handling for AngularJS

## logToServer.js

* Replaces standard AngularJS [$log](https://docs.angularjs.org/api/ng/service/$log) to version that logs to the server, and optionally to the console using a [consoleAppender](http://jsnlog.com/Documentation/WebConfig/JSNLog/ConsoleAppender).
* Replaces AngularJS [$exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler) with version that logs JavaScript exceptions to the server.
* Provides [Interceptors](https://docs.angularjs.org/api/ng/service/$http#interceptors) to log AJAX errors and timeouts to the server, and to log warning messages when AJAX responses are slow.

## How to use

1. [Install the JSNLog JavaScript Logging Package](http://jsnlog.com/). 

2. Copy logToServer.js to your site and load it into your pages, such as with a script tag.

3. To use the new $log and $exceptionHandler, simply import module _logToServer_ into your main module, like so:
```
var app = angular.module('mainmodule', ['logToServer']);
```

4. To use the interceptors, add them to the interceptors array for your application:
```
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('logToServerInterceptor');
}]);
```

5. When you call $http to send an AJAX message, set the timeout and the delay after which a warning log message is sent in milliseconds in the config object, using _timeout_ and _warningAfter_:
```
$http({ method: '...', url: '...', data: ..., timeout: 5000, warningAfter: 2000 })
.success(function (data, status, headers, config) {
	...
})
.error(function (data, status, headers, config) {
	...
});
```

Or when using the [new type of promises](https://docs.angularjs.org/api/ng/service/$q):
```
$http({ method: '...', url: '...', data: ..., timeout: 5000, warningAfter: 2000 })
.then(function(response) {
	...
})
.catch(function (rejection) {
	...
})
.finally(function () {
	...
});
```

## Working demo code

In the Demo directory you'll find the working source code of very simple demo site that puts all this in action.

## Documentation

[More about AngularJS Error Handling](http://jsnlog.com/Documentation/GetStartedLogging/AngularJsErrorHandling)

