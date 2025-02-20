var nivel = -1;
var barSpeed=10

const myBar = document.getElementById("myBar");
const playButt = document.getElementById('playButt')
const myProgress = document.getElementById('myProgress')
const userData = document.getElementById("userdata")
/* const text = document.getElementById("text")
 */const showText = document.getElementById("showText")
const input = document.getElementById("input")
const levelLog = document.getElementById("levelLog");
const mycanvas = document.getElementById("mycanvas")   //no anda

let user = [];
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
        playButt.style.display="block";
        if (nivel==-1) {
          nivel = 0;
        }
        clearInterval(id);
        i = 0;
        width = 1;
        if (levels.length > nivel-1) {// que quiere decir esto? SI QUEDAN NIVELES EN ARRAY
          levelAlert()
        }
        //return ;// y este return? SALES DEL IF LA BARRA ESTA LLENA
      } else {// y esto? LA BARRA SIGUE LLENANDOSE
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
  user.push(newValue)
  console.log('levelUP to ', nivel+1, user)
  console.log('value of input at level ', nivel, ' : ', newValue);
  barAnimation();
  text.style.display = 'none';
  input.style.display = 'none';
  playButt.disabled = true;
  levels[nivel].updateSo()
  console.log(so);
  localStorage.setItem('data', JSON.stringify({user: user, so: so}))
  addLog(nivel, newValue)
  levelLog.innerHTML = nivel;
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

const playClick = () => {
  if (nivel === -1) {
    initHeal()
  } else {
    levelUP()
  }
}

const loadGame = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  console.log("aqui nos quedamos", data);
  so = data.so;
  user = data.user;
  nivel = user.length - 1;
  levelLog.innerHTML = nivel;
  for (let u = 0; u < user.length; u++) {
    const log = user[u];
    if (log !== null) {
      addLog(u, log)
    }
  };
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
    loadGame()
  }
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