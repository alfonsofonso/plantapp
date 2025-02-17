//// main.js
//////////////////////////////////////////     globales   //////////////////////////////
var mainVol=0.8;
var notaBase=60;//
var numeroDeOctavas=3;
var nivel = 0;
var nubes=[];
var numNubes=5;
var duracion = 60;// sonificaNombre
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
const userDataDiv = document.getElementById("userdata")
const btnSubeXP = document.getElementById("puntua")
let xp = 0;

let userData = {
  name : null,
  altura : null,
  peso : null,
  edad: null,
  zodiaco: null
};

let indexValue = 0;// valor 
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

var iLevel = 0;
const subeNivel = () => {
  levelUP.disabled = true;
  levelUP.innerText = levels[nivel].feature;
  console.log('** nivel: ', nivel, 'speed: ', barSpeed);
  barSpeed = levels[nivel].speed;
  console.log("speed ahora:",barSpeed)
  iLevel = 0;
  barra.style.width = '0%';
  userData[levels[nivel].feature] = levels[nivel].values[indexValue];// popula objeto usuario
  levelInput.style.display = 'none';
  console.log(userData);
  addVariable(levels[nivel].values[indexValue])
  indexValue = 0;
  nivel++;
  levelUP.innerText = levels[nivel].feature;
/*   botones.style.display = 'block';
 */  barAnimation()
}

//////////////////////////////////////////     functions   //////////////////////////////
function barAnimation() {
  if (iLevel == 0) {
    iLevel = 1;
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
      //console.log(width)
      if (width >= 1000) {
        clearInterval(id);
        iLevel = 0;
        width = 1;
        levelUP.disabled = false;
        btnSubeXP.disabled = false;
        return ;
      } else {
        width += barSpeed;
        barra.style.width = width/10 + "%";
      }
    }
  }
}
function initHeal(event){
  btnSubeXP.disabled = true;
  levelUP.disabled = true;
  const user = document.getElementById('user').value;
  userData.name = user
  event.preventDefault(user)
  startForm.style.display= 'none';
  game.style.display= 'block';
  addVariable(user)
  nivel++;
  levelUP.innerText = levels[nivel].feature;
  duracion = sonificaNombre(user)
  //subeNivel()
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
yuxtapon=function(q){///regEx
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
    console.log("sonifico",suma);
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
	clock.tempo=120;//el tempo en lissajousJS
}

function addVariable(valor){
  console.log("valor en add variable" , valor)
  //valor= valor||"60"
  let newLevel = levels[nivel];
  console.log(newLevel)
  let d= document.createElement("div");
  d.className = "userInfo";
  d.innerText = newLevel.feature + ": "+ valor;
  userDataDiv.appendChild(d);
}

const addPoints = () => {
  xp++
  console.log(xp, "xp")
  btnSubeXP.disabled = true;
  levelUP.disabled = true;
  barAnimation()
}
