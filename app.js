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


weatherApp.controller('forecastCtrl', ['$scope', '$resource' ,'cityService', function($scope,$resource, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
    { callback: "JSON_CALLBACK" }, 
    { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherApi.get({
        q: $scope.city,
        cnt: 7,
        appid: "f3988637806bfbb1e77b057704da9cc3"     
    });
    
    
    $scope.convertToFarenheit = function(degK) {
        
       return Math.round((1.8 * (degK - 273)) + 32);
       
    }
    
}]);

// f3988637806bfbb1e77b057704da9cc3