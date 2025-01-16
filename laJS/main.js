//// main.js
//////////////////////////////////////////     globales   //////////////////////////////
var mainVol=0.8;
var notaBase=60;//
var numeroDeOctavas=3;
var nivel = 0;
var nubes=[];
var numNubes=1;
var duracion=levels[0].duracion;
var maxDuracion=1251;
var escalas=['ionian','melodicminor','wholetone','diminished','blues','pentatonicmajor',
 'pentatonicminor','flamenco','altered','bebopdominant','bebopdominantflatnine',
 'bebopmajor','bebopminor','major','major7','major6','dominant','dominantflat5',"augmented",
 'minor','minor7','minor6','dim','minorflat5','sus4','sus2','fouths','fifth','tritone',
 'hexatonic','chromatic',"octaves"];
var aroma="sus4";
var grupo;
var nombresNotas=["C", "Db", "D", "Eb", "E","F", "Gb", "G", "Ab", "A", "Bb", "B" ];
//////////////////////////////////////////     instrumentos   //////////////////////////////
const barra = document.getElementById("myBar");
const botones = document.getElementById('botones');
const startForm = document.getElementById('startForm')
const game = document.getElementById('game')
const  playButt = document.getElementById('playButt')
const  userName = document.getElementById('user-name')
const  myProgress = document.getElementById('myProgress')
const  myBar=  document.getElementById('myBar'); 

var i = 0;
const subeNivel = () => {
  nivel++;
  duracion = levels[nivel].duracion;
  console.log('nivel:', nivel, duracion);
  i = 0;
  barra.style.width = '0%';

  botones.removeChild(document.getElementById('aob'));
  botones.style.display = 'none';
  barAnimation()
}

//////////////////////////////////////////     functions   //////////////////////////////
function barAnimation() {
  if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
      //console.log(width)
      if (width >= 1000) {
        clearInterval(id);
        i = 0;
        width = 1;
        botones.style.display="block";
        const boton = document.createElement('button');
        boton.className= 'addOnButt';
        boton.id = 'aob'
        boton.onclick = subeNivel;
        boton.innerText = levels[nivel].feature;
        botones.appendChild(boton);

        //elem.style.width = 0;
        return ;
      } else {
        width += duracion*3;
        barra.style.width = width/10 + "%";
      }
    }
  }
}

  
  function initHeal(event){
    event.preventDefault()
    const user = document.getElementById('user').value;
    console.log("puto")
    startForm.style.display= 'none';
    game.style.display= 'block';
    userName.innerText= user;
    myProgress.style.display= 'block';
    myBar.style.display= 'block'; 
    barAnimation();
	if(context.state!="runing"){
		context.resume();
	}
	creaArr();
  nivel++;
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
yuxtapon=function(q){///???
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

resetea=function(){
	if(healing){
		initHeal()
	}
}


//////////////////////////////////////////     start    //////////////////////////////

function empieza(){
	console.log("empiezo")
	context.resume();
	clock.tempo=100;
}


