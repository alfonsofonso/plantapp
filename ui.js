var nivel = -1;
var barSpeed=10

const myBar = document.getElementById("myBar");
const playButt = document.getElementById('playButt')
const myProgress = document.getElementById('myProgress')
const userData = document.getElementById("userdata")
const text = document.getElementById("text")
/* const showText = document.getElementById("showText") */
const input = document.getElementById("input")
const levelLog = document.getElementById("levelLog");
const mycanvas = document.getElementById("mycanvas")   //no anda

<<<<<<< HEAD
let user = []
let iNiv = 0;// no llames una variable global i  porfa, colisionan demasiado a menudo
              /// las globales con nombre propio... muy propio! que significa esta variable? 

//////////////////////////////////////////     functions   //////////////////////////////
=======
let user = [];
let i = 0;
let data = null;
let welcome = true;

>>>>>>> a67b2eb57013694d1154cb5b3983dc0dbd1f1177
function barAnimation() {
  console.log('baranimation')
  if (iNiv == 0) {
    iNiv = 1;
    var width = 1;
    var id = setInterval(frame, 100);
    
    function frame() {///// avanza barra
      //console.log(width)
<<<<<<< HEAD
      if (width >= 1000) { // si llega al final de la barra
        if (nivel==-1) {
          playButt.style.display="block"
          nivel=0
=======
      if (width >= 1000) {
        playButt.style.display="block";
        if (welcome) {
          welcome = false  // repetido?
          welcomeAlert();
        } else if (levels.length > nivel-1) {// que quiere decir esto? SI QUEDAN NIVELES EN ARRAY
          levelAlert();
>>>>>>> a67b2eb57013694d1154cb5b3983dc0dbd1f1177
        }
        clearInterval(id);
        iNiv = 0;
        width = 1;
<<<<<<< HEAD
        if (levels.length > nivel-1) {// que quiere decir esto?
         //playButt.style.display = "none";
         playButt.disabled= false
          levelAlert()
        }
        return ;//
      } else {// sigue creciendo la barra 
=======
      } else {// y esto? LA BARRA SIGUE LLENANDOSE
>>>>>>> a67b2eb57013694d1154cb5b3983dc0dbd1f1177
        width += barSpeed;
        myBar.style.width = width/10 + "%";
      }
    }
  }
}

function initHeal(){
  console.log('initheal')
  playButt.disabled = true;
  text.style.display = 'none';
	if(context.state!="runing"){
		context.resume();
	}
  nivel = 0;
  barAnimation()
  levelLog.innerHTML = nivel;
	creaArr();// iniciar sonido
}

function addLog(lvl, value){
  console.log(lvl, value);
  console.log(levels[lvl]);
  let li = document.createElement("li");
  li.className = "userLog";
  if (value) {
    li.innerText = levels[lvl].prefx + value + levels[lvl].suffx;
    userData.appendChild(li);
  }
}

const levelUP = () => {
  const newValue = levels[nivel].value();
  if (!newValue) {
    return ;
  }
  user.push(newValue)
  console.log('levelUP to ', nivel+1, user)
  console.log('value of input at level ', nivel, ' : ', newValue);
  barAnimation();
  text.style.display = 'none';
  input.style.display = 'none';
  playButt.disabled = true;
  levels[nivel].updateSo()
<<<<<<< HEAD
  if(nivel==0){initHeal()}
  addVariable()
=======
  console.log(so);
  localStorage.setItem('data', JSON.stringify({user: user, so: so}))
  addLog(nivel, newValue)
  levelLog.innerHTML = nivel;
>>>>>>> a67b2eb57013694d1154cb5b3983dc0dbd1f1177
  nivel++;
  /* mycanvas.style.opacity = 1; */           //no anda
}

const levelAlert = () => {
  console.log('alert from level ', nivel);
  text.innerText = levels[nivel].text;
  input.innerHTML = levels[nivel].input;
  text.style.display = 'block';
  input.style.display = 'block';
  playButt.disabled = false;
 /*  mycanvas.style.opacity = 0.5; */
  /* playButt.onclick = levelUP; */
}
const welcomeAlert = () => {
  console.log('welcome from level ', nivel);
  const wellcomeText = user[1]
  ? 'Wellcome back ' + user[1] + ' you can restart you experience from level ' + nivel
  : "Welcome! The sound is the same for everyone. Progress to personalize it based on your unique vibration."
  text.innerText = wellcomeText;
  text.style.display = 'block';
  playButt.disabled = false;
  welcome = false;
 /*  mycanvas.style.opacity = 0.5; */
  /* playButt.onclick = levelUP; */
}

const playClick = () => {
<<<<<<< HEAD
=======
  if (welcome) {
    
  }
  welcome = false;
  if (nivel === 0) {
    initHeal()
  } else {
>>>>>>> a67b2eb57013694d1154cb5b3983dc0dbd1f1177
    levelUP()
}

const loadGame = () => {
  data = JSON.parse(localStorage.getItem("data"));
  so = data.so;
  user = data.user;
  nivel = user.length - 1;
  levelLog.innerHTML = nivel;
  for (let u = 0; u < user.length; u++) { //populate userInfo
    const log = user[u];
    if (log !== null) {
      addLog(u, log)
    }
  };
};

function checkLocalStorage() {
  if (localStorage.getItem('data') !== null) {
      console.log("'data' key exists in localStorage.");
      loadGame();
      return true;
  } else {
      console.log("'data' key is not present in localStorage.");
      initHeal()
      return false;
  }
}

onload=function(){
	initVisual();
  context.resume();
	clock.tempo=120;//el tempo en lissajousJS
  barAnimation();
  info();// un console log
  checkLocalStorage();
}

const resetLocalStorage = () => {
  console.log('reset data')
  localStorage.removeItem("data");
  console.log(localStorage);
  location.reload();
}
/* 
showText.addEventListener("mousedown", () => {
  text.style.display = "block";
});

// Hide text when released
showText.addEventListener("mouseup", () => {
  text.style.display = "none";
});

// Also hide when mouse leaves the button
showText.addEventListener("mouseleave", () => {
  text.style.display = "none";
}); */