angular.module('demoModule', [])
  .controller('DemoController', ['$http', DemoController]);

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
    throw 0;
};

DemoController.prototype.sendWait = function (ms) {
    $('#message').text('Please wait');
    $('#spinner').show();

    this._$http.get('/api/wait/' + ms)
      .then(function(response) {
          showSuccessMessage(response.data);
      })
      .catch(function(errorReason) {
          showErrorMessage(errorReason.data.ExceptionMessage);
      })
      .finally(function() {
          $('#spinner').hide();
      });
};

