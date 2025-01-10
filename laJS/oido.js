/*
The MIT License (MIT)
Copyright (c) 2014 Chris Wilson*/
 
 // retalled by alfonsofonso

// constructor:
//
// 		Oido.escucha(function(){})  // callback opcional
// 
// metodos:
//
// 		Oido.nota() -- devuelve nota musical
//
// propiedades:
//
// 		Oido.pitch -- devuelve hertzs
// 		Oido.umbral -- threshold volume
// 		Oido.rafID -- requestAnimationFrame

console.log("Oido.escucha(function(){})  / allback opcional metodos: Oido.nota() -- devuelve nota musicalpropiedades: Oido.pitch -- devuelve hertzs Oido.umbral -- threshold volume, Oido.rafID -- requestAnimationFrame"); 


Oido=new function(){

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	this.audioContext = null;
	this.analyser = null;
	this.noteStrings = ["A3","B3","C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4","A4","B4","C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5","C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6"];
	this.notas=["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]
	this.MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.
	this.rafID = null;
	this.buf = new Float32Array( 1024 );
	this.pitch=0;
	this.umbral=0.01;
	this.functionCallback;
	var grabando=false;
	let hfp=4000;//hz max to care
	let acumulador=0;
	let tolerancia=20;
	this.frase=[];

	this.escucha=function(funcion){
		if(Oido.audioContext==undefined||Oido.audioContext==null){
			console.log("creo audioContext")
			Oido.audioContext =new AudioContext();
		}
		if(funcion==null||funcion==undefined){
			Oido.functionCallback=function(){
				if(Oido.pitch<hfp){////// paso de los agudos
					if(grabando){
						Oido.graba()
					}else{
						Oido.apunta()
					//console.log("hertz:",Math.round(Oido.pitch), Oido.notas[Oido.note%12])
					}
				};
			}
		}else{
			Oido.functionCallback=funcion;
		}
		Oido.MAX_SIZE = Math.max(4,Math.floor(Oido.audioContext.sampleRate/5000));	// corresponds to a 5kHz signal
		Oido.init();
	}


	this.init=function() {
	 
	    getUserMedia(
	    	{
	            "audio": {
	                "mandatory": {
	                    "googEchoCancellation": "false",
	                    "googAutoGainControl": "false",
	                    "googNoiseSuppression": "false",
	                    "googHighpassFilter": "false"
	                },
	                "optional": []
	            },
	        }, Oido.gotStream);
	}

	getUserMedia=function(dictionary, callback) {
	    try {
	        navigator.getUserMedia = 
	        	navigator.getUserMedia ||
	        	navigator.webkitGetUserMedia ||
	        	navigator.mozGetUserMedia;
	        navigator.getUserMedia(dictionary, callback, Oido.error);
	    } catch (e) {
	        alert('hola getUserMedia threw exception :' + e);
	    }
	}
	this.error=function() {
		console.log("al loro, stream generation failed, allow mic!")
	    alert('al loro, Stream generation failed.');
	}

	this.gotStream=function(stream) {
		 
		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
        window.cancelAnimationFrame( Oido.rafID );


	    // Create an AudioNode from the stream.
	    mediaStreamSource = Oido.audioContext.createMediaStreamSource(stream);

	    // Connect it to the destination.
	    Oido.analyser = Oido.audioContext.createAnalyser();
	    Oido.analyser.fftSize = 2048;
	    mediaStreamSource.connect( Oido.analyser );
	    Oido.updatePitch();
	}

	this.autoCorrelate=function( buf, sampleRate ) {
		var SIZE = buf.length;
		var MAX_SAMPLES = Math.floor(SIZE/2);
		var best_offset = -1;
		var best_correlation = 0;
		var rms = 0;
		var foundGoodCorrelation = false;
		var correlations = new Array(MAX_SAMPLES);

		for (var i=0;i<SIZE;i++) {
			var val = buf[i];
			rms += val*val;
		}

		rms = Math.sqrt(rms/SIZE);
		if (rms<Oido.umbral) // not enough signal: 0.01
			return -1;

		var lastCorrelation=1;
		for (var offset = Oido.MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
			var correlation = 0;

			for (var i=0; i<MAX_SAMPLES; i++) {
				correlation += Math.abs((buf[i])-(buf[i+offset]));
			}
			correlation = 1 - (correlation/MAX_SAMPLES);
			correlations[offset] = correlation; // store it, for the tweaking we need to do below.
			if ((correlation>0.9) && (correlation > lastCorrelation)) {
				foundGoodCorrelation = true;
				if (correlation > best_correlation) {
					best_correlation = correlation;
					best_offset = offset;
				}
			} else if (foundGoodCorrelation) {
				var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
				return sampleRate/(best_offset+(8*shift));
			}
			lastCorrelation = correlation;
		}
		if (best_correlation > 0.01) {
			return sampleRate/best_offset;
		}
		return -1;
	}

	this.updatePitch=function( time ) {
		var cycles = new Array;
		Oido.analyser.getFloatTimeDomainData( Oido.buf );
		var ac = Oido.autoCorrelate( Oido.buf, Oido.audioContext.sampleRate );
		// TODO: Paint confidence meter on canvasElem here.	
	 		if (ac == -1) {
		 		//pitchElem.innerText = "--";
	 		} else {	
			 	Oido.pitch = ac;
		 		Oido.note =  noteFromPitch( Oido.pitch );
		 		Oido.functionCallback();
			}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = window.webkitRequestAnimationFrame;
		Oido.rafID = window.requestAnimationFrame( Oido.updatePitch );
	}

	this.nota=function(){
		return Oido.notas[Oido.note%12];//  %12
	}


	this.apunta=function(){
			n=Oido.notas[Oido.note%12]
			if(n!=Oido.frase[Oido.frase.length-1]){//si es una nota diferente
				acumulador++;
				if(acumulador>tolerancia){
				if(Oido.frase.length>10){Oido.frase.splice(0,1)}
				Oido.frase.push(n);
				acumulador=0;
				console.log("apunto "+n)
				Oido.recuerda();	
			}	
		}
	}

	this.recuerda=function(){
		let sl=Oido.frase.slice(Oido.frase.length-3);

		if(JSON.stringify(sl)=='["C","D","E"]'){
			console.log("Xxxxxxxxxxxxxxxx   LANZO FUNCION DO RE MI  xxxxxxxxX")
			subele()
		}else if(JSON.stringify(sl)=='["C","D","E"]'){
			console.log("Xxx MI RE DO xxX")
			bajale()
		}

		
	}

	this.graba=function(){
		console.log(" xxxxxx   grabando   xxxxxx ")
		grabando=true;
	}

	this.paraGrabacion=function(){
		console.log("xxx   paraGrabacion   xxx")
		grabando=false;
	}

}//Oido

/////////////////////////////// HELPERS  //////////////////////////

function noteFromPitch( frequency ) {
	var noteNum = 12 * (Math.log( frequency / 110 )/Math.log(2) );
	return Math.round( noteNum );
};

function frequencyFromNoteNumber( note ) {
	return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}
