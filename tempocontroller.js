myApp.controller('tempoController', ['$scope', '$log', 'scoreData', function ($scope, $log, scoreData) {

    $scope.count = 0;
    $scope.settingTempo = false;
    
    $scope.tempo = 369;
    $scope.timesigdem = "4";
    $scope.timesignum = "3";
    
    $scope.setOrStopTempoClick = function(){
        $log.debug($scope.tempo);
        $scope.settingTempo = !$scope.settingTempo;
        $log.debug($scope.tempo);
    };
    
    $scope.markTempoClick = function(){
        $log.debug($scope.tempo);
        $scope.count +=1;
        $log.debug($scope.tempo);

    };
  
}]);