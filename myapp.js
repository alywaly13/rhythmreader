var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(
    function($routeProvider){
        $routeProvider
            .when('/', 
                   {templateUrl:'views/tempo.html', 
                   controller: 'tempoController'})
            .when('/about', 
                 {templateUrl:'views/about.html', 
                  controller: 'aboutController'})
            .when('/main', 
                 {templateUrl:'views/main.html', 
                 controller:'mainController'});
    }
);





