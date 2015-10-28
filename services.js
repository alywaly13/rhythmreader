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
        //Below two are for note values that will be longer that 4 and require a tie
        var fours = Math.floor(frac /4);
        frac = frac %4;
        var minDiff = 100; 
        var minDiffArg = 0.25;
        
        for (var j=0; j<possibleNoteValues.length; j++){
          if (Math.abs(possibleNoteValues[j]-frac) < minDiff){
            minDiff = Math.abs(possibleNoteValues[j]-frac);
            minDiffArg = possibleNoteValues[j];
          }
        }
            
        //wait, but if frac is too close to zero, just set it to zero and forget what we just calculated.
        if (frac<0.35){
            minDiffArg = 0;
        }
        console.log("length" + newLength);
        console.log("value" + minDiffArg + fours*4);
        this.noteValues.push(minDiffArg + fours*4);
    };
    
    this.resetNotes = function(){
        this.noteValues=[];
        this.noteLengths=[];
    }
    
});

myApp.service('vexFlowHelpers', function(){
    this.notes = [[]];
    this.ties = [[]];
    this.canvas = $("canvas")[0];
    var startNewCanvas=false;

    this.drawCanvas = function(timesigdem){
        var maxwidth = $("canvas").parent().parent().parent().width()*0.9;
        console.log("canvas width " + this.canvas.width);
    //    console.log("window max width " + maxwidth);
        if (this.canvas.width +50 < maxwidth){
            this.canvas.width = this.canvas.width + 50;
        }
        else{
            this.canvas.width = maxwidth;
            startNewCanvas = true;
        }
        var renderer = new Vex.Flow.Renderer(this.canvas, Vex.Flow.Renderer.Backends.CANVAS);
        var ctx = renderer.getContext();
        var stave = new Vex.Flow.Stave(10, 0, Math.round(this.canvas.width * 0.95));
        stave.addClef("treble").setContext(ctx).draw();

        // Create a voice in 4/4
          var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: timesigdem,
            resolution: Vex.Flow.RESOLUTION
          });

        voice.setStrict(false)
        voice.addTickables(this.notes[this.notes.length-1]);
        var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice],  Math.round(this.canvas.width * 0.94));

        voice.draw(ctx, stave);

        for (var i=0; i<this.ties[this.ties.length-1].length; i++){
            this.ties[this.ties.length-1][i].setContext(ctx).draw();
        }
    };
    
    this.drawNewCanvas = function(){
    //    newcanvas.addClass("outline");
        $("#canvases").append("<canvas>");
        this.canvas = $("canvas")[$("canvas").length-1];
        this.canvas.width = 300;
        this.canvas.height = 100;
    }
    
    this.addNote = function(noteValue){
        if (startNewCanvas){
            this.notes.push([]);
            this.ties.push([]);
            this.drawNewCanvas();
            startNewCanvas = false;
        }
        var frac = noteValue %4;
        var fours = Math.floor(noteValue/4);
        if (fours ==0){
            this.notes[this.notes.length-1].push(this.getVexNote(frac));
        }
        else{
            var tiednotes = [];
            for (var i=0; i<fours; i++){
                tiednotes.push(this.getVexNote(4));
            }
            if (frac !=0){
                tiednotes.push(this.getVexNote(frac));
            }
            var tie = new Vex.Flow.StaveTie({
                first_note: tiednotes[0],
                last_note: tiednotes[tiednotes.length - 1],
                first_indices: [0],
                last_indices: [0]
                });
            this.notes[this.notes.length-1] = this.notes[this.notes.length-1].concat(tiednotes);
            this.ties[this.ties.length-1].push(tie);
        }
        console.log(this.notes);
    };
    
    this.addBarline = function(){
        this.notes[this.notes.length-1].push(new Vex.Flow.BarNote());
    };
    
    this.getVexNote = function(noteValue){
        switch(noteValue) {
            case 0.5:
                return new Vex.Flow.StaveNote({ keys: ["f/4"], duration: "8"});
            case 1.5:
                return new Vex.Flow.StaveNote({ keys: ["f/4"], duration: 'q'}).addDotToAll();
            case 2:
                return new Vex.Flow.StaveNote({ keys: ["f/4"], duration: 'h' });
            case 3:
                return new Vex.Flow.StaveNote({ keys: ["f/4"], duration: 'h'}).addDotToAll();
            case 4:
                return new Vex.Flow.StaveNote({ keys: ["f/4"], duration: 'w'});
            default:
                return new Vex.Flow.StaveNote({ keys: ["f/4"], duration: 'q'});
        }
    };
    
    this.reset = function(){
        this.notes = [[]];
        this.ties = [[]];
        $("#canvases").remove();
        $("#main").append("<div id=\"canvases\"><canvas width=250 height=100></canvas></div>");
        this.canvas = $("canvas")[0];

        var startNewCanvas=false;
    };
    
});