
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
          console.log('cazzo')
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
/* playButt.addEventListener('click', )
 */function initHeal(){
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
const levelAlert = () => {
  console.log('alert from level ', nivel);
  text.innerText = levels[nivel].text;
  input.innerHTML = levels[nivel].inputInnerHTML;
  text.style.display = 'block';
  input.style.display = 'block';
  mycanvas.style.opacity = 0.5;
  my
  playButt.onclick = levelUP;
}
const levelUP = () => {
  nivel++;
  console.log('levelUP to ', nivel)
  barAnimation();
  text.style.display = 'none';
  input.style.display = 'none';
  playButt.disabled = true;
  playButt.onclick = levelAlert;
  mycanvas.style.opacity = 1;           //no anda
}

/* let so = { 
  mainVol: 0.8, // 0-1
  notaBase: 40, // 10-72
  numNubes: 4,
  numeroDeOctavas: 4, // 1-8 (related to notaBase)
  duracion: 100, // 1-1000
  silencios: 100, // to be determined
  aroma: "major"
}; */

const levels = [
  {
      text: "Welcome! The sound is the same for everyone. Progress to personalize it based on your unique vibration.",
      callback: () => {
          document.getElementById("input").innerHTML = "<p>Default sound activated. Level up to unlock customization!</p>";
      }
  },
  {
      text: "Your **name** carries a vibrational frequency. We convert it into a numerical value to adjust the base note of the sound.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="name">Enter your name:</label>
              <input type="text" id="name" oninput="updateSo(2, this.value)">
          `;
      }
  },
  {
      text: "Your **height** affects resonance. Taller individuals may experience deeper tones.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="height">Enter your height (cm):</label>
              <input type="number" id="height" oninput="updateSo(3, this.value)">
          `;
      }
  },
  {
      text: "Your **weight** influences sound absorption. We adjust the duration accordingly.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="weight">Enter your weight (kg):</label>
              <input type="number" id="weight" oninput="updateSo(4, this.value)">
          `;
      }
  },
  {
      text: "Colors have vibrational frequencies. Your **favorite color** influences the musical scale.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="color">Choose your favorite color:</label>
              <select id="color" onchange="updateSo(5, this.value)">
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="purple">Purple</option>
              </select>
          `;
      }
  },
  {
      text: "Your **mood** influences the complexity of the sound.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="mood">How do you feel?</label>
              <select id="mood" onchange="updateSo(6, this.value)">
                  <option value="happy">Happy</option>
                  <option value="calm">Calm</option>
                  <option value="sad">Sad</option>
                  <option value="angry">Angry</option>
              </select>
          `;
      }
  },
  {
      text: "Each **element** has a sound profile. Choose yours!",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="element">Select your element:</label>
              <select id="element" onchange="updateSo(7, this.value)">
                  <option value="earth">Earth</option>
                  <option value="water">Water</option>
                  <option value="fire">Fire</option>
                  <option value="air">Air</option>
                  <option value="ether">Ether</option>
              </select>
          `;
      }
  },
  {
      text: "Your **birthdate** holds a numerical vibration that determines silent pauses.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="birthdate">Enter your birthdate:</label>
              <input type="date" id="birthdate" onchange="updateSo(8, this.value)">
          `;
      }
  },
  {
      text: "Your **zodiac sign** is linked to cosmic frequencies. We'll fine-tune the base note.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="zodiac">Choose your zodiac sign:</label>
              <select id="zodiac" onchange="updateSo(9, this.value)">
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
          `;
      }
  },
  {
      text: "Time of day affects brainwave activity. Adjust your sound for energy or relaxation.",
      callback: () => {
          document.getElementById("input").innerHTML = `
              <label for="timeOfDay">Select the time of day:</label>
              <select id="timeOfDay" onchange="updateSo(10, this.value)">
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="night">Night</option>
              </select>
          `;
      }
  }
];

// Function to update `so` object
function updateSo(level, value) {
  switch (level) {
      case 2:
          let nameValue = [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0);
          so.notaBase = 10 + (nameValue % 63);
          break;
      case 3:
          so.numeroDeOctavas = Math.max(1, Math.min(8, Math.floor(value / 30)));
          break;
      case 4:
          so.duracion = Math.max(10, Math.min(1000, value * 5));
          break;
      case 5:
          const colorToScale = { red: "minor", blue: "major", green: "pentatonic", yellow: "dorian", purple: "phrygian" };
          so.aroma = colorToScale[value.toLowerCase()] || "major";
          break;
      case 6:
          const moodMap = { happy: 6, calm: 4, sad: 3, angry: 2 };
          so.numNubes = moodMap[value.toLowerCase()] || 4;
          break;
      case 7:
          const elementToVol = { fire: 1, water: 0.7, earth: 0.5, air: 0.8, ether: 0.9 };
          so.mainVol = elementToVol[value.toLowerCase()] || 0.8;
          break;
      case 8:
          let birthSum = value.split("-").reduce((sum, num) => sum + parseInt(num), 0);
          so.silencios = birthSum % 100;
          break;
      case 9:
          const zodiacTuning = { aries: 45, taurus: 42, gemini: 48, cancer: 36, leo: 52 };
          so.notaBase = zodiacTuning[value.toLowerCase()] || so.notaBase;
          break;
      case 10:
          so.mainVol *= value === "morning" ? 1.2 : value === "night" ? 0.8 : 1;
          break;
  }
  console.log("Updated so:", so);
}

// Function to level up
function levelUp(newLevel) {
  if (levels[newLevel]) {
      document.getElementById("level-text").innerHTML = levels[newLevel].text;
      levels[newLevel].callback();
  }
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