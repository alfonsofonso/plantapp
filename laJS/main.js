//// main.js
//////////////////////////////////////////     globales   //////////////////////////////
var mainVol=0.8;
var notaBase=60;// C
var numeroDeOctavas=3;
var nivel = 0;
var nubes=[];
var numNubes=1;
var duracion=16;
var maxDuracion=1251;
var escalas=['ionian','melodicminor','wholetone','diminished','blues','pentatonicmajor',
 'pentatonicminor','flamenco','altered','bebopdominant','bebopdominantflatnine',
 'bebopmajor','bebopminor','major','major7','major6','dominant','dominantflat5',"augmented",
 'minor','minor7','minor6','dim','minorflat5','sus4','sus2','fouths','fifth','tritone',
 'hexatonic','chromatic',"octaves"];
var aroma="sus4";
var grupo;
var nombresNotas=["C", "Db", "D", "Eb", "E","F", "Gb", "G", "Ab", "A", "Bb", "B" ];
var barSpeed = 15;
//////////////////////////////////////////     instrumentos   //////////////////////////////
var elem = document.getElementById("myBar");


//////////////////////////////////////////     functions   //////////////////////////////
var i = 0;
function barAnimation() {
  if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 1000);
    function frame() {
      console.log(width)
      if (width >= 1000) {
        clearInterval(id);
        i = 0;
        width = 1;
        window.document.getElementById('levelUp').style.display="inline";
        const botones = window.document.getElementById('botones')
        botones.style.display="block";

        //elem.style.width = 0;
        return ;
      } else {
        width += barSpeed;
        elem.style.width = width/10 + "%";
      }
    }
  }
}

  
  function initHeal(){
    console.log("puto")
    document.getElementById('startForm').style.display= 'none';
    const userName = document.getElementById('userName').value;
    document.getElementById('game').style.display= 'block';
  document.getElementById('botHeal').style.display= 'none';
  document.getElementById('user-name').innerText= userName;
  document.getElementById('myProgress').style.display= 'block';/*
  document.getElementById('myBar').style.display= 'block'; */
/*   document.getElementById('micanvas').style.display= 'block';
 */  barAnimation();
	if(context.state!="runing"){
		context.resume();
	}
	creaArr();
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



retrocede=function(arr){
	dale(historia[momentoHistorico-1])
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