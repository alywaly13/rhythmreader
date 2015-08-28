var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(
    function($routeProvider){
        $routeProvider
            .when('/', 
                   {templateUrl:'views/tempo.html', 
                   controller: 'tempoController'})
            .when('/main', 
                 {templateUrl:'views/main.html', 
                 controller:'mainController'});
    }
);





