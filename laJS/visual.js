//visual.js

var displaying=true;
var consola=document.getElementById("console");

var amp=0;
var alt=0;
var radio=0;//hipotenusa del canvas
var margen=100;

var stage = new createjs.Stage("micanvas");
var canvasContext=document.getElementById("micanvas");

var funVisuals=[];////// visuales
var visualActivo=0;
var lines=0;
var arrTeclas=[];


createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.setFPS=10;
createjs.Ticker.addEventListener("tick", tick);



ponVisual=function(a,v){
  funVisuals[visualActivo](a,v)
  ponEstrella(a,v)
}

escribe=function(t){/// input orders
  console.log(t);
  var i=document.getElementById("consola");
  i.value="";
  eval(t);
}

////// on init
function initVisual(){
  ajustaCanvas();
  funVisuals=[ponEstrella];
  document.bgColor="black";
}

function info(){
    console.log("..............................");
  console.log(".....................");
  
  console.log("   info() : ");
  console.log("........fluon, fluir(),  Oido.escucha(), grupo, volumenSounds()..............");
}

onload=function(){
	initVisual();
  empieza();
  info()

}
ontouchend = (event) => {empieza() };

/////     HELPERS
function tick(event) {
  stage.update()
}

window.onresize = function(event) {
  ajustaCanvas()
  resizeCanvas(amp,alt);clear();
}

ajustaCanvas=function(){
  amp=canvasContext.width  = window.innerWidth-10;
  alt=canvasContext.height = window.innerHeight-20;
  radio= Math.round(Math.sqrt(amp*amp+alt*alt)/2);
  //document.getElementById("pantalla").style.width=amp ;
  equis=amp/2;
  igriega=alt/2;

}


displayData=function(t){
  console.log("d "+t)
	for (var i =0;i<arguments.length;i++){
		consola.value+="\n"+t+" ";
		consola.scrollTop = consola.scrollHeight;
	}
  lines = consola.value.split('\n');

  if (lines.length>8){
    lines.shift();
    consola.value=lines.join("\n");
  }
}

function handleComplete(dispon) {
  dispon.removeAllEventListeners();
  stage.removeChild(dispon);
  dispon=null;
}

var showSlid = document.getElementById("showSli");
var inmunizinControls=document.getElementById("inmunizingControls")
showSlid.oninput = function() {
  if(showSlid.value==0){
    inmunizingControls.style.visibility="hidden" 
  }else{
    inmunizingControls.style.visibility="initial" 
  }
  console.log("hide controls?",showSlid.value)
}

var showSlidRain = document.getElementById("showSliRain");
var rainContr=document.getElementById("rainControls")
showSlidRain.oninput = function() {
  if(showSlidRain.value==0){
    rainContr.style.display="none" 
  }else{
    rainContr.style.display="block" 
  }
  console.log("hide controls?",showSlidRain.value)
}

/* var showRanura = document.getElementById("ranura");
showRanura.onclick = function() {
 
    showRanura.style.display="none" 
    console.log("hide ranura")
}
 */
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomGris() {
    var letters = '0123456789ABCDEF';

    let color="";
    for (var i = 0; i < 2; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log("c0lor "+'#'+color+color+color)
    return '#'+color+color+color;
}

Function.prototype.method=function(name, func){
  this.prototype[name] = func;
  return this
}

Number.method('integer',function(){
  return Math.round(this)
  // return Math[this<0? 'ceil':'floor'](this)
});

Number.method('natural',function(){
  return Math.round(Math.abs(this))
  // return Math[this<0? 'ceil':'floor'](this)
});

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function vesLanzando(){
 let a=Math.round(Math.random()*40)+50;
 let v=Math.random()*.80+.20;
  //ponEstrella(a,v);
// let b= Tone.Frequency(a, "midi").toFrequency();/// al loro

//  sinte.triggerAttackRelease(a,v*8,Tone.Transport.now() ,v)
  //console.log("voy lanzando "+a+" "+b)
}

//t=setInterval(vesLanzando,3000);

//t2=setInterval(function(){velSpacial=Math.random()*200000},1000);
