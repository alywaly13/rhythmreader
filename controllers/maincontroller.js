
myApp.controller('mainController', ['$scope', '$log', 'scoreData', function ($scope, $log, scoreData) {

    $scope.count = 13135;
    $scope.tempo = scoreData.tempo;
    $scope.timesigdem = scoreData.timesigdem;
    $scope.timesignum = scoreData.timesignum;
 
    
     $scope.setOrStopBeatClick = function(){
        $scope.settingBeat = !$scope.settingBeat;
        $scope.count = 0;
        if ($scope.settingBeat){
            //We're about to start setting the tempo
            scoreData.noteLengths = [];
            scoreData.noteValues = [];
            $scope.noteValues = [];
        }
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
            $log.debug(scoreData.noteLengths);
            $scope.oldBeatTime=$scope.currentBeatTime;
            $scope.oldBeatDate=$scope.currentBeatDate;
        }
        $scope.count++;

    };
    
    $scope.keyPressed = function(e){
        $scope.renderNotes();
        if (e.which==77 && $scope.settingBeat){
            $scope.markBeatClick();
        }
    };
    
    $scope.getImageName = function(noteValue){
        switch(noteValue) {
            case 0.5:
                return 'eighth';
            case 1.5:
                return 'dottedquarter';
            case 2:
                return 'half';
            case 3:
                return 'dottedhalf';
            case 4:
                return 'whole';
            default:
                return 'quarter'
        }
    };
    
    $scope.drawCanvas = function(){
        var canvas = $("canvas")[0];
        var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
        var ctx = renderer.getContext();
        var stave = new Vex.Flow.Stave(10, 0, 500);
        stave.addClef("treble").setContext(ctx).draw();
        alert($scope.notes.length);

        // Create a voice in 4/4
          var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: $scope.timesigdem,
            resolution: Vex.Flow.RESOLUTION
          });

        voice.setStrict(false)

        voice.addTickables($scope.notes);
        
        var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 400);

        voice.draw(ctx, stave);
    };
    
    $scope.addNote = function(durationCode){
        $scope.notes.push(new Vex.Flow.StaveNote({ keys: ["f/4"], duration: durationCode }));
        alert($scope.notes.length);
    };
    
    $scope.addBarline = function(){
        $scope.notes.push(new Vex.Flow.BarNote());
    };
    
    $scope.notes = [];
    $scope.addNote("q");
    $scope.drawCanvas();
    $scope.addNote("h");
    $scope.drawCanvas();
    $scope.addNote("8");
    $scope.drawCanvas();
    $scope.addNote("8");
    $scope.drawCanvas();


  
}]);