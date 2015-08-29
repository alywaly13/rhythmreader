myApp.controller('tempoController', ['$scope', '$log', '$location', 'scoreData', function ($scope, $log, $location, scoreData) {

    $scope.settingTempo = false;
    
    $scope.tempo = 100;
    $scope.timesigdem = "4";
    $scope.timesignum = "4";
    
    $scope.setOrStopTempoClick = function(){
        $log.debug($scope.tempo);
        $scope.settingTempo = !$scope.settingTempo;
        $log.debug($scope.tempo);
        $scope.count = 0;
        if ($scope.settingTempo){
            //We're about to start setting the tempo
            $scope.tempo = undefined;
        }
        else{
            $scope.tempo = 60000/$scope.averageBeat;
        }
    };
    
    $scope.markTempoClick = function(){
        if ($scope.count==0){
            $scope.oldBeatDate = new Date();
            $scope.oldBeatTime = $scope.oldBeatDate.getTime();
            $scope.averageBeat = 0;
        }
        else{
            $scope.currentBeatDate = new Date();
            $scope.currentBeatTime = $scope.currentBeatDate.getTime();
            $scope.averageBeat = ($scope.averageBeat*($scope.count-1)+$scope.currentBeatTime - $scope.oldBeatTime)/($scope.count);
          //  form.mainLabel.setText(currentBeatTime - oldBeatTime);
            $scope.oldBeatTime=$scope.currentBeatTime;
            $scope.oldBeatDate=$scope.currentBeatDate;
        }
        
        $scope.count++;
        $log.debug($scope.tempo);
        $log.debug($scope.tempo);

    };
    
    $scope.doneTempoPage = function(){
        scoreData.tempo = $scope.tempo;
        scoreData.timesigdem = $scope.timesigdem;
        scoreData.timesignum = $scope.timesignum;
        $location.path("/main");  
    };
    
    $scope.keyPressed = function(e){
        if (e.which==77 && $scope.settingTempo){
            $scope.markTempoClick();
        }
    };
  
}]);