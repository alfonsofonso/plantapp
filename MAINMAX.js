//// main.js
//////////////////////////////////////////     globales   //////////////////////////////
var mainVol=0.8;
var notaBase=60;//
var numeroDeOctavas=3;
var nivel = -1;
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
  levelInputValue.innerText = levels[nivel + 1].values[indexValue];
  if (indexValue === 0) {
    leftButt.disabled = true;
  } else {
    leftButt.disabled = false;
  }
  if (indexValue === (levels[nivel + 1].values.length - 1)) {
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
  /* if (condition) {
    
  } */
  leftButt.disabled = true;
  console.log('stocazzo', levelInputText)
  levelInput.style.display = 'block';
  let text = 'Congratulations, you can now upgrade your vibration with ' + levels[nivel +1].feature;
  levelInputText.innerText = text;
  levelInputValue.innerText = levels[nivel + 1].values[indexValue];
  levelUP.style.display = 'none';
}

var i = 0;


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
        if (levels.length > nivel-1) {
          levelUP.disabled = false;
        }
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
  const user = document.getElementById('user').value;
  event.preventDefault(user)
  startForm.style.display= 'none';
  game.style.display= 'block';
  upgradeLevel(user);
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


//////////////////////////////////////////     start    //////////////////////////////

function addVariable(valor){
  let newLevel = levels[nivel];
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
  levelInput.style.display = 'none';
  levelUP.style.display = 'block';
  barAnimation()
}

let s = {
   mainVol: 0.8,
 notaBase: 60,//
 numeroDeOctavas: 3,
 nubes: [],
 numNubes: 5,
 duracion :  60,// sonificaNombre
/*  barSpeed: levels[0].speed,
 */ 
  maxDuracion: 1251,
 aroma: "sus4",
}

const upgradeLevel = () => {
  //const actualLevel = levels[nivel];
  btnSubeXP.disabled = true;
  levelUP.disabled = true;
  levelInput.style.display = 'none';
  levelUP.style.display = 'block';
  const newLevel = levels[nivel + 1];
  let value = newLevel.values[indexValue];
  console.log(value)
  levelUP.innerText = levels[nivel + 2].feature;
  if (newLevel.mode === 'string') {
    s[newLevel.sound] = str2MinMax(value, newLevel.min, newLevel.max);
  }
  else if (newLevel.mode === 'number') {
    console.log(
      value, 
      newLevel.values[0], 
      newLevel.values[newLevel.values.length - 1],
      newLevel.min, 
      newLevel.max
    )
    s[newLevel.sound] = mapNumRange(
      value, 
      newLevel.values[0], 
      newLevel.values[newLevel.values.length - 1],
      newLevel.min, 
      newLevel.max
    )
    indexValue = newLevel.values.length / 2
  }
  userData[newLevel.feature] = value;
  barSpeed = newLevel.speed;
  console.log(s)
  i = 0;
  /* barra.style.width = '0%'; */
  barAnimation()
  nivel++;
  addVariable(value);

  /* updatesound(s); AQUI LE DAS DE COMER EL s  */ 
}