
myApp.controller('mainController', ['$scope', '$log', '$location', 'scoreData', 'vexFlowHelpers', function ($scope, $log, $location, scoreData, vexFlowHelpers) {

    $scope.id = "canvasid";
    $scope.count;
    $scope.tempo = scoreData.tempo;
    $scope.timesigdem = scoreData.timesigdem;
    $scope.timesignum = scoreData.timesignum;
    
     $scope.setOrStopBeatClick = function(){
        $scope.settingBeat = !$scope.settingBeat;
        $scope.count = 0;
        if ($scope.settingBeat){
            //We're about to start inputting
            scoreData.noteLengths = [];
            scoreData.noteValues = [];
            $scope.noteValues = [];
        }
  /*      else{
            //We're done inputting stuff
            for (var i=0; i<$scope.noteValues.length; i++){
                alert(i);
                var canvas = $("canvas")[0];
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            //    vexFlowHelpers.addNote(vexFlowHelpers.getDurationCode($scope.noteValues[i]));
                vexFlowHelpers.drawCanvas($scope.timesigdem);
            }
        }*/
    };
    
    $scope.markBeatClick = function(){
        if ($scope.count==0){
            $scope.oldBeatDate = new Date();
            $scope.oldBeatTime = $scope.oldBeatDate.getTime();
        }
        else{
            $scope.currentBeatDate = new Date();
            $scope.currentBeatTime = $scope.currentBeatDate.getTime();
            scoreData.updateNoteValues($scope.currentBeatTime-$scope.oldBeatTime);
            $scope.noteValues = scoreData.noteValues;
            
        /*    var canvas = $("canvas")[0];
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);*/
            //TODO: ADD BARLINES BASED ON TIME SIGNATURE
            
            //Todo: don't do it by getting the last added thing
            vexFlowHelpers.addNote($scope.noteValues[$scope.noteValues.length-1]);
            vexFlowHelpers.drawCanvas($scope.timesigdem);

            $log.debug(scoreData.noteLengths);
            $scope.oldBeatTime=$scope.currentBeatTime;
            $scope.oldBeatDate=$scope.currentBeatDate;
        }
        $scope.count++;

    };
    
    $scope.resetNotes = function(){
        $scope.noteValues=[];
        scoreData.reset();
        vexFlowHelpers.reset();
        $("#canvases").remove();
        $("#main").append("<div id=\"canvases\"><canvas width=200 height=100></canvas></div>");
        console.log($("#canvases"));
        console.log($("canvas").length);
        console.log($("canvas")[0]);
        console.log($("canvas")[4]);
        
    };
    
    $scope.keyPressed = function(e){
        if (e.which==77 && $scope.settingBeat){
            $scope.markBeatClick();
        }
    };
    
    $scope.getImageName = function(noteValue){
        switch(noteValue) {
            case 0.5:
                return 'eighth';
            case 1:
                return 'quarter';
            case 1.5:
                return 'dottedquarter';
            case 2:
                return 'half';
            case 3:
                return 'dottedhalf';
            case 4:
                return 'whole';
            default:
                return 'longer than whole'
        }
    };
    
}]);