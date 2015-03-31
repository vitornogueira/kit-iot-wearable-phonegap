var angular = angular.module('KitIoTWearable', [
  'ngRoute',
  'mobile-angular-ui'
]);

//Route config
angular.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'dashboard.html',
    controller: 'DashboardController'
  });
});

//App controllers
angular.controller('DashboardController', function ($rootScope, $scope) {
  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.loading = false;
  });

  //Set sliders to 0
  $scope.resetSlider = function () {
    $scope.red = 0;
    $scope.green = 0;
    $scope.blue = 0;
  };

  $scope.resetSlider();

  //Turn the led off
  $scope.ledOFF = function () {
    wearable.ledOFF();
    $scope.resetSlider();
  };

  //On melody change
  $scope.melodyChange = function () {
    wearable.updateBuzzer($scope.melody);
  };

  //On slider change
  $scope.ledChange = function (color) {
    var val = $scope[color];

    if (color === 'red') {
      wearable.updateLed('LR', val);
    }
    if (color === 'green') {
      wearable.updateLed('LG', val);
    }
    if (color === 'blue') {
      wearable.updateLed('LB', val);
    }
  };
});

