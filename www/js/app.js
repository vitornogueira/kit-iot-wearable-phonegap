var app = angular.module('KitIoTWearable', [
  'ngRoute',
  'mobile-angular-ui'
]);

//Route config
app.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'dashboard.html',
    controller: 'DashboardController'
  });
});

//App controllers
app.controller('DashboardController', function ($rootScope, $scope) {
  $scope.userAgent = navigator.userAgent;

  $rootScope.$on('$routeChangeStart', function () {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function () {
    $rootScope.loading = false;
  });
});
