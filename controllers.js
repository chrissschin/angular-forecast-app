//controllers
weatherApp.controller('homeCtrl',['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
}]);


weatherApp.controller('forecastCtrl', ['$scope', '$resource' ,'cityService', '$routeParams', function($scope,$resource, cityService, $routeParams) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
    { callback: "JSON_CALLBACK" }, 
    { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherApi.get({
        q: $scope.city,
        cnt: $scope.days,
        appid: "f3988637806bfbb1e77b057704da9cc3"     
    });
    
    
    $scope.convertToFarenheit = function(degK) {
        
       return Math.round((1.8 * (degK - 273)) + 32);
       
    }
    
    $scope.convertToDate = function(dt) {
        
        return new Date(dt * 1000);
        
    }   
    
    console.log($scope.weatherResult);
     
}]);