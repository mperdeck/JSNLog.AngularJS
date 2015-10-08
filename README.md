# Logging and JavaScript error handling for AngularJS

## logToServer.js

[JSNLog](http://jsnlog.com) lets you log exceptions and other events in your client side code and store them in your server side log. Supports Elmah, NLog, Log4Net, Serilog and any other package with a Common.Logging adapter.

logToServer.js makes it easy to integrate JSNLog in your AngularJs app.

* Replaces standard AngularJS [$log](https://docs.angularjs.org/api/ng/service/$log) to version that logs to the server, and optionally to the console using a [consoleAppender](http://jsnlog.com/Documentation/WebConfig/JSNLog/ConsoleAppender).
* Replaces AngularJS [$exceptionHandler](https://docs.angularjs.org/api/ng/service/$exceptionHandler) with version that logs JavaScript exceptions to the server.
* Provides [Interceptors](https://docs.angularjs.org/api/ng/service/$http#interceptors) to log AJAX errors and timeouts to the server, and to log warning messages when AJAX responses are slow.

## Working demo code

In the Demo directory you'll find the working source code of a very simple demo site that puts all this in action.

* The solution file is in Demo/JSNLog.AngularJS.Demo. Open that in Visual Studio. If you don't have Visual Studio, get [Visual Studio Express](https://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx) for free.
* Rebuild the solution. This will import the Nuget packages.
* Hit F5 to run the demo site. You'll see some buttons to generate events. Hit a few.
* This demo uses Elmah as the server side logging package. Open http://localhost:*portnumber*/elmah.axd to see the log messages written to the log. JSNLog supports NLog, Log4Net, Serilog as well.

## How to use logToServer.js

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

## Documentation

[More about AngularJS Error Handling](http://jsnlog.com/Documentation/GetStartedLogging/AngularJsErrorHandling)

