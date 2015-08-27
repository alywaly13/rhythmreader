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

myApp.service('scoreData', function(){
    this.timesignum = 4;
    this.timesigdem = 4;
    //this.tempo
    //this.noteValues;
    //this.noteLengths;
    this.updateNoteValues = function(newLength){
        //right now, not necessary to track noteLengths, but aw heck why not?
        this.noteLengths.push(newLength);

        var possibleNoteValues = [.5, 1, 1.5, 2, 3, 4];
        //this is because we want newLengh/beatLength, where beatLength is time in millisecs of one quarter note 
        var frac = newLength*this.tempo/60000; 
        var minDiff = 100; 
        var minDiffArg = 0.25;
        for (var j=0; j<possibleNoteValues.length; j++){
          if (Math.abs(possibleNoteValues[j]-frac) < minDiff){
            minDiff = Math.abs(possibleNoteValues[j]-frac);
            minDiffArg = possibleNoteValues[j];
          }
        }
        this.noteValues.push(minDiffArg);
    };
    
});



