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

myApp.service('vexFlowHelpers', function(){
    
    this.notes = [];
    
    this.drawCanvas = function(timesigdem){
        var canvas = $("#canvasid")[0];
        var maxwidth = $(window).width();
        alert("canvas width" +canvas.width);
        alert("window width" + maxwidth);
        if (canvas.width + 50 < maxwidth){
            alert(canvas.width);
            canvas.width = canvas.width + 40;
        }
        else{
            canvas.width = canvas.width ;
        }
        var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
        var ctx = renderer.getContext();
        var stave = new Vex.Flow.Stave(10, 0, Math.round(canvas.width * 0.95));
        stave.addClef("treble").setContext(ctx).draw();

        // Create a voice in 4/4
          var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: timesigdem,
            resolution: Vex.Flow.RESOLUTION
          });

        voice.setStrict(false)

        voice.addTickables(this.notes);
        
        var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice],  Math.round(canvas.width * 0.94));

        voice.draw(ctx, stave);
    };
    
    this.addNote = function(durationCode){
        this.notes.push(new Vex.Flow.StaveNote({ keys: ["f/4"], duration: durationCode }));
    };
    
    this.addBarline = function(){
        this.notes.push(new Vex.Flow.BarNote());
    };
    
    this.getDurationCode = function(noteValue){
        switch(noteValue) {
            case 0.5:
                return "8";
            case 1.5:
                return 'dq';
            case 2:
                return 'h';
            case 3:
                return 'dh';
            case 4:
                return 'w';
            default:
                return 'q'
        }
    };
    
});