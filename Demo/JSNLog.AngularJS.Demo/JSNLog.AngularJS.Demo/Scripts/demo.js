angular.module('demoModule', [])
  .controller('DemoController', DemoController);

function DemoController() {
}

DemoController.prototype.throw = function () {
    throw 0;
};

DemoController.prototype.sendWait = function (ms) {
    alert(ms);
};

