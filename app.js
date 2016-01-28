'use-strict'

//module
var weatherApp = angular.module("weatherApp", ['ngRoute', 'ngResource']);


//routes
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastCtrl'
    })
});

//services
weatherApp.service('cityService', function(){
    
    this.city = "Carson, CA"
    
});



//controllers
weatherApp.controller('homeCtrl',['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
}]);


weatherApp.controller('forecastCtrl', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
}]);

// f3988637806bfbb1e77b057704da9cc3