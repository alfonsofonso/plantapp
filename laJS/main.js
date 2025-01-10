//// main.js
//////////////////////////////////////////     globales   //////////////////////////////
var mainVol=0.8;
var notaBase=60;// C
var numeroDeOctavas=3;
var nubes=[];
var numNubes=8;
var maxNubes=20;
var duracion=106;
var maxDuracion=1251;
var escalas=['ionian','melodicminor','wholetone','diminished','blues','pentatonicmajor',
 'pentatonicminor','flamenco','altered','bebopdominant','bebopdominantflatnine',
 'bebopmajor','bebopminor','major','major7','major6','dominant','dominantflat5',"augmented",
 'minor','minor7','minor6','dim','minorflat5','sus4','sus2','fouths','fifth','tritone',
 'hexatonic','chromatic',"octaves"];
var aroma="pentatonicmajor";
var arrMomentos;
var historia=[[numNubes,aroma,duracion]];
var momentoHistorico=0;
var healing=false;
var aleatori=false;
var grupo;
var nombresNotas=["C", "Db", "D", "Eb", "E","F", "Gb", "G", "Ab", "A", "Bb", "B" ];
//////////////////////////////////////////     instrumentos   //////////////////////////////


//////////////////////////////////////////     functions   //////////////////////////////

function initHeal(){
	if(context.state!="runing"){
		context.resume();
	}


	destruyeArr();
	dale();
}

function creaArr(){//n=num notas	
	grupo=new group();
	for(var i=0;i<numNubes;i++){
		nubes[i]=new track(); ///lissajousJS
		var d=eval("walk."+yuxtapon(aroma)+"("+notaBase+","+numeroDeOctavas+")");
		nubes[i].beat(duracion).notes(d).nl(duracion)
			.adsr(duracion/4,duracion/3,.6,duracion/2).vol(mainVol*0.25/nubes.length)
			.trans(Math.random()/10);
		grupo.add(nubes[i]);
	};
	
	console.log("nubes: "+numNubes+" dur: "+duracion+" aroma: "+aroma)
	return [numNubes,aroma,duracion]

}
yuxtapon=function(q){
 return q=q.replace(/\s/g, '');

}

function destruyeArr(){// vacia nubes
	console.log("diluyo nubes: "+nubes.length)
	for(var i=0;i<nubes.length;i++){
		nubes[i].destroy();
		delete nubes[i];
	};	
	nubes=[];
}

dale= function(arr){

	if(healing==true){			//stop
		healing=false;
		document.getElementById('botHeal').style.backgroundColor = "rgba(10,10,100,0)";
		document.getElementById('botHeal').style.color = "rgba(10,10,256,1)";
		
		return
	}else{						//play
		healing=true;
		 document.getElementById('botHeal').style.backgroundColor = "rgba(60,60,250,.8)";
		 document.getElementById('botHeal').style.color = "white";
		if (arr==undefined||arr=={}){// nueva seccion
			
			if(aleatori){
				aleatoria()
			}
			velSpacial=duracion*200;//a 10bpm
			historia.push(creaArr());///// aquí la crea!!!!
			momentoHistorico++;
			console.log("nuevo momento: ",momentoHistorico)
		}else{// repito seccion
			arrMomentos.numNubes=numNubes;
			arrMomentos.aroma=aroma;
			arrMomentos[2].duracion=duracion;
			velSpacial=duracion*2000;//a 10bpm
			momentoHistorico=historia.indexOf(arrMomentos);
			creaArr();
			console.log("momentoHistorico= ",momentoHistorico)
		}
	}
}

retrocede=function(arr){
	dale(historia[momentoHistorico-1])
}
/// volumen
var volumeSlid = document.getElementById("volumeSli");
var volumeSpan = document.getElementById("volumeSpan");
volumeSlid.oninput = function() {
 mainVol=volumeSlid.value/100;
 console.log(mainVol)
  volumeSpan.innerText=parseInt(mainVol*100);
  replega()
resetea()
}


///  escala
var escaSlid = document.getElementById("escalaSli");
var escalaSpan = document.getElementById("escalaSpan");
escaSlid.oninput = function() {
 aroma=escalas[parseInt(escaSlid.value)]
  escalaSpan.innerText=aroma;
  replega()
  resetea()
}

var duraSlid = document.getElementById("duraSli");
var duraSpan = document.getElementById("duraSpan");

duraSlid.oninput = function(n) {
	
 duracion=parseInt(Math.pow(duraSlid.value,2)/8+1);
  duraSpan.innerText=duracion;
  replega()
  resetea()
}

var poliSlid = document.getElementById("poliSli");
var poliSpan = document.getElementById("poliSpan");
poliSlid.oninput = function() {
 numNubes=parseInt(poliSlid.value);
  poliSpan.innerText=numNubes;
  replega()
  resetea()
}

var baseSlid = document.getElementById("baseSli");
var baseSpan = document.getElementById("baseSpan");
baseSlid.oninput = function() {
 notaBase=parseInt(baseSlid.value);
 let notabaseIngles=nombresNotas[notaBase%12];
  baseSpan.innerText=notabaseIngles+Math.floor((notaBase-12)/12)+" ("+notaBase+")";
  replega()
resetea()
}

var tesiSlid = document.getElementById("tesiSli");
var tesiSpan = document.getElementById("tesiSpan");
tesiSlid.oninput = function() {
 numeroDeOctavas=parseInt(tesiSlid.value);
  tesiSpan.innerText=numeroDeOctavas;
  replega()
resetea()
}

resetea=function(){
	if(healing){
		initHeal()
	}
}


function aleatoria(){
	numNubes=Math.ceil(Math.random()*maxNubes);
	aroma=escalas[Math.floor(Math.random()*escalas.length)];
	duracion=Math.ceil(Math.random()*maxDuracion);
	poliSlid.value=numNubes;poliSpan.innerText=numNubes;
	escaSlid.value=escalas.indexOf(aroma);escalaSpan.innerText=aroma;
	duraSlid.value=duracion;duraSpan.innerText=duracion;
}
//////////////////////////////////////////     start    //////////////////////////////
function quitaBot(){
	let b=	document.getElementById("botHeal");
	b.remove();
	context.resume();
}

function empieza(){
	console.log("empiezo")
	context.resume();
	clock.tempo=100;
}

volumenSounds=function(volu){
	mainVol=volu;
	for(var i=0;i<numNubes;i++){
	nubes[i].vol(mainVol*0.2/nubes.length)
	console.log("bajando")
	}
}

function replega(){
	for (let i = 0; i < nubes.length; i++) {
		viaja(stage.children[i],423,-2.1,2,333);
		console.log("stop")
	  }
}