
//////////////////////////////////////////     globales   //////////////////////////////

var nivel = -1;

var nubes=[];
var numNubes=5;
var grupo;
var barSpeed=100

var escalas=['ionian','melodicminor','wholetone','diminished','blues','pentatonicmajor',
 'pentatonicminor','flamenco','altered','bebopdominant','bebopdominantflatnine',
 'bebopmajor','bebopminor','major','major7','major6','dominant','dominantflat5',"augmented",
 'minor','minor7','minor6','dim','minorflat5','sus4','sus2','fouths','fifth','tritone',
 'hexatonic','chromatic',"octaves"];
var nombresNotas=["C", "Db", "D", "Eb", "E","F", "Gb", "G", "Ab", "A", "Bb", "B" ];

//////////////////////////////////////////     instrumentos   //////////////////////////////
const myBar = document.getElementById("myBar");
const playButt = document.getElementById('playButt')
const myProgress = document.getElementById('myProgress')
const userData = document.getElementById("userdata")

//////////////////////////////////////////     functions   //////////////////////////////
let i = 0;
function barAnimation() {
  console.log('baranimation')
  if (i == 0) {
    i = 1;
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
      //console.log(width)
      if (width >= 1000) {
        if (nivel==-1) {
          playButt.style.display="block"
          nivel=0
        }
        clearInterval(id);
        i = 0;
        width = 1;
        if (levels.length > nivel-1) {
          levelUP.disabled = false;
        }

        return ;
      } else {
        width += barSpeed;
        myBar.style.width = width/10 + "%";
      }
    }
  }
}

function initHeal(){
  playButt.style.display="none"
	if(context.state!="runing"){
		context.resume();
	}
  barAnimation()
	creaArr();// iniciar sonido
}

function creaArr(){//n=num notas	
	grupo=new group();
	for(var i=0;i<so.numNubes;i++){
		nubes[i]=new track(); ///lissajousJS
		var d=eval("walk."+yuxtapon(so.aroma)+"("+so.notaBase+","+so.numeroDeOctavas+")");
		nubes[i].beat(so.duracion).notes(d).nl(so.duracion)
			.adsr(so.duracion/4,so.duracion/3,.6,so.duracion/2).vol(so.mainVol*0.25/nubes.length)
			.trans(Math.random()/10);
		grupo.add(nubes[i]);
	};
	console.log("nubes: "+so.numNubes+" dur: "+so.duracion+" aroma: "+so.aroma)
  //return [so]

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
  userData.appendChild(d);
}

const upgradeLevel = () => {
  //const actualLevel = levels[nivel];

  /* levelUP.disabled = true;
  levelInput.style.display = 'none';
  levelUP.style.display = 'block';
  const newLevel = levels[nivel + 1];

  let value = newLevel.values[indexValue];
  
  console.log(value,"mi value")
 
  levelUP.innerText = levels[nivel + 2].feature;

  if (newLevel.mode === 'string') {
    so[newLevel.sound] = str2MinMax(value, newLevel.min, newLevel.max);
  }
  else if (newLevel.mode === 'number') {
    console.log(
      value, 
      newLevel.values[0], 
      newLevel.values[newLevel.values.length - 1],
      newLevel.min, 
      newLevel.max
    )
    so[newLevel.sound] = mapNumRange(
      value, 
      newLevel.values[0], 
      newLevel.values[newLevel.values.length - 1],
      newLevel.min, 
      newLevel.max
    )
    indexValue = newLevel.values.length / 2
  }

  userData[newLevel.feature] = value; */
  barSpeed = newLevel.speed;
  console.log(so)
  i = 0;
  /* myBar.style.width = '0%'; */
  barAnimation()
  nivel++;
  addVariable(value);

  /* updatesound(s); AQUI LE DAS DE COMER EL so  */ 
}