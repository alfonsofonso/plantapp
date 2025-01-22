//// main.js
//////////////////////////////////////////     globales   //////////////////////////////
var mainVol=0.8;
var notaBase=60;//
var numeroDeOctavas=3;
var nivel = 0;
var nubes=[];
var numNubes=5;
var duracion = 60;
var barSpeed=levels[0].speed;
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
const playButt = document.getElementById('playButt')
const userName = document.getElementById('user-name')
const myProgress = document.getElementById('myProgress')
const myBar=  document.getElementById('myBar');
const levelUP = document.getElementById('levelUP');
const levelInput = document.getElementById('levelInput');
const levelInputText = document.getElementById('levelInputText')
const leftButt = document.getElementById('leftButt')
const rightButt = document.getElementById('rightButt')
const levelInputValue = document.getElementById('levelInputValue')

let userData = {
  name : null,
  altura : 0,
  peso : 0,
  edad: 0,
  zodiaco: ''
};

let indexValue = 0;
const changeValue = (operation) => {
  if (operation === 'plus') {
    indexValue++
  } else {
    indexValue--
  };
  levelInputValue.innerText = levels[nivel].values[indexValue];
  if (indexValue === 0) {
    leftButt.disabled = true;
  } else {
    leftButt.disabled = false;
  }
  if (indexValue === (levels[nivel].values.length - 1)) {
    rightButt.disabled = true;
  } else {
    rightButt.disabled = false;
  }
}

/* const selectUserValue = () => {
  userData[levels[nivel].feature] = levels[nivel].values[indexValue];
  indexValue = 0;
  levelInput.style.display = 'none';
  console.log(userData);
  subeNivel()
} */

const showLevelInput = () => {
  leftButt.disabled = true;
  console.log('stocazzo', levelInputText)
  levelInput.style.display = 'block';
  let text = 'Congratulations, you can now upgrade your vibration with ' + levels[nivel].feature;
  levelInputText.innerText = text;
  levelInputValue.innerText = levels[nivel].values[indexValue];
  levelUP.style.display = 'none';
}

var i = 0;
const subeNivel = () => {
  levelUP.disabled = true;
  levelUP.innerText = levels[nivel].feature;
  console.log('** nivel: ', nivel, 'speed: ', barSpeed);
  barSpeed = levels[nivel].speed;
  console.log("speed ahora:",barSpeed)
  i = 0;
  barra.style.width = '0%';
  userData[levels[nivel].feature] = levels[nivel].values[indexValue];
  indexValue = 0;
  levelInput.style.display = 'none';
  console.log(userData);
  nivel++;
  levelUP.innerText = levels[nivel].feature;
  levelUP.style.display = 'block';
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
        levelUP.disabled = false;
        return ;
      } else {
        width += barSpeed;
        barra.style.width = width/10 + "%";
      }
    }
  }
}
function initHeal(event){
  levelUP.disabled = true;
  event.preventDefault()
  startForm.style.display= 'none';
  game.style.display= 'block';
  nivel++;
  levelUP.innerText = levels[nivel].feature;
  const user = document.getElementById('user').value;
  userName.innerText= user;
  barAnimation();
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

function sonificaNombre(sustan){
  sustantivo = sustan || "Jose";
  suma = getCharCodes(sustantivo).reduce((valorAnterior, valorActual) => {
      return valorAnterior + valorActual;
    }, 0);
    console.log(suma);
    return suma
}
function getCharCodes(s) {
  let charCodeArr = [];
  for (let i = 0; i < s.length; i++) {
      let code = s.charCodeAt(i);
      charCodeArr.push(code);
  }
  return charCodeArr;
}

//////////////////////////////////////////     start    //////////////////////////////

function empieza(){
	console.log("empiezo")
	context.resume();
	clock.tempo=100;
}


