
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
const text = document.getElementById("text")
const input = document.getElementById("input")
const mycanvas = document.getElementById("mycanvas")   //no anda

let user = [null]
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
          playButt.disabled = false;
          levelAlert()
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
  console.log('initheal')
  playButt.disabled = true;
  playButt.onclick = levelAlert;
  text.style.display = 'none';
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
const levelUP = () => {
  nivel++;
  console.log('levelUP to ', nivel, user)
  console.log('value of input at level ', nivel, ' : ', levels[nivel].value());
  console.log(levels[nivel])
  barAnimation();
  text.style.display = 'none';
  input.style.display = 'none';
  playButt.disabled = true;
  levels[nivel].updateSo()
  console.log(so);
  /* mycanvas.style.opacity = 1; */           //no anda
}
const levelAlert = () => {
  console.log('alert from level ', nivel);
  text.innerText = levels[nivel].text;
  input.innerHTML = levels[nivel].input;
  text.style.display = 'block';
  input.style.display = 'block';
 /*  mycanvas.style.opacity = 0.5; */
  /* playButt.onclick = levelUP; */
}

const playClick = () => {
  if (nivel === -1) {
    initHeal()
  } else {
    levelUP()
  }
}

const levels = [
  {
    text: "Welcome! The sound is the same for everyone. Progress to personalize it based on your unique vibration.",
    input: `<p>Default sound activated. Level up to unlock customization!</p>`,
    value: function () { return null; },
    updateSo: function () {
      console.log("Default level - No changes.");
    }
  },
  {
    text: "Your **name** carries a vibrational frequency. We convert it into a numerical value to adjust the base note of the sound.",
    input: `
      <label for="name">Enter your name:</label>
      <input type="text" id="name">
    `,
    value: function () { return document.getElementById("name")?.value || ""; },
    updateSo: function () {
      let value = this.value();
      let nameValue = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
      so.notaBase = 10 + (nameValue % 63);
    }
  },
  {
    text: "Your **height** affects resonance. Taller individuals may experience deeper tones.",
    input: `
      <label for="height">Enter your height (cm):</label>
      <input type="number" id="height">
    `,
    value: function () { return parseFloat(document.getElementById("height")?.value) || 0; },
    updateSo: function () {
      let value = this.value();
      so.numeroDeOctavas = Math.max(1, Math.min(8, Math.floor(value / 30)));
    }
  },
  {
    text: "Your **weight** influences sound absorption. We adjust the duration accordingly.",
    input: `
      <label for="weight">Enter your weight (kg):</label>
      <input type="number" id="weight">
    `,
    value: function () { return parseFloat(document.getElementById("weight")?.value) || 0; },
    updateSo: function () {
      let value = this.value();
      so.duracion = Math.max(10, Math.min(1000, value * 5));
    }
  },
  {
    text: "Colors have vibrational frequencies. Your **favorite color** influences the musical scale.",
    input: `
      <label for="color">Choose your favorite color:</label>
      <select id="color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
      </select>
    `,
    value: function () { return document.getElementById("color")?.value || "major"; },
    updateSo: function () {
      let value = this.value();
      const colorToScale = { red: "minor", blue: "major", green: "pentatonic", yellow: "dorian", purple: "phrygian" };
      so.aroma = colorToScale[value.toLowerCase()] || "major";
    }
  },
  {
    text: "Your **mood** influences the complexity of the sound.",
    input: `
      <label for="mood">How do you feel?</label>
      <select id="mood">
        <option value="happy">Happy</option>
        <option value="calm">Calm</option>
        <option value="sad">Sad</option>
        <option value="angry">Angry</option>
      </select>
    `,
    value: function () { return document.getElementById("mood")?.value || "calm"; },
    updateSo: function () {
      let value = this.value();
      const moodMap = { happy: 6, calm: 4, sad: 3, angry: 2 };
      so.numNubes = moodMap[value.toLowerCase()] || 4;
    }
  },
  {
    text: "Each **element** has a sound profile. Choose yours!",
    input: `
      <label for="element">Select your element:</label>
      <select id="element">
        <option value="earth">Earth</option>
        <option value="water">Water</option>
        <option value="fire">Fire</option>
        <option value="air">Air</option>
        <option value="ether">Ether</option>
      </select>
    `,
    value: function () { return document.getElementById("element")?.value || "air"; },
    updateSo: function () {
      let value = this.value();
      const elementToVol = { fire: 1, water: 0.7, earth: 0.5, air: 0.8, ether: 0.9 };
      so.mainVol = elementToVol[value.toLowerCase()] || 0.8;
    }
  },
  {
    text: "Your **birthdate** holds a numerical vibration that determines silent pauses.",
    input: `
      <label for="birthdate">Enter your birthdate:</label>
      <input type="date" id="birthdate">
    `,
    value: function () { return document.getElementById("birthdate")?.value || ""; },
    updateSo: function () {
      let value = this.value();
      let birthSum = value.split("-").reduce((sum, num) => sum + parseInt(num || 0), 0);
      so.silencios = birthSum % 100;
    }
  },
  {
    text: "Your **zodiac sign** is linked to cosmic frequencies. We'll fine-tune the base note.",
    input: `
      <label for="zodiac">Choose your zodiac sign:</label>
      <select id="zodiac">
        <option value="aries">Aries</option>
        <option value="taurus">Taurus</option>
        <option value="gemini">Gemini</option>
        <option value="cancer">Cancer</option>
        <option value="leo">Leo</option>
        <option value="virgo">Virgo</option>
        <option value="libra">Libra</option>
        <option value="scorpio">Scorpio</option>
        <option value="sagittarius">Sagittarius</option>
        <option value="capricorn">Capricorn</option>
        <option value="aquarius">Aquarius</option>
        <option value="pisces">Pisces</option>
      </select>
    `,
    value: function () { return document.getElementById("zodiac")?.value || "aries"; },
    updateSo: function () {
      let value = this.value();
      const zodiacTuning = { aries: 45, taurus: 42, gemini: 48, cancer: 36, leo: 52 };
      so.notaBase = zodiacTuning[value.toLowerCase()] || so.notaBase;
    }
  },
  {
    text: "Time of day affects brainwave activity. Adjust your sound for energy or relaxation.",
    input: `
      <label for="timeOfDay">Select the time of day:</label>
      <select id="timeOfDay">
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="night">Night</option>
      </select>
    `,
    value: function () { return document.getElementById("timeOfDay")?.value || "afternoon"; },
    updateSo: function () {
      let value = this.value();
      so.mainVol *= value === "morning" ? 1.2 : value === "night" ? 0.8 : 1;
    }
  }
];





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

onload=function(){
	initVisual();
  context.resume();
	clock.tempo=120;//el tempo en lissajousJS
  barAnimation();
  info()// un console log
  console.log(this.localStorage);
  if (this.localStorage.length === 0) {
    console.log('new session');
  } else {
    const data = JSON.parse(localStorage.getItem("data"));
    so = data.so;
  }
}