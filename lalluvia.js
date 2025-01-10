// questions?@alfonsofonso:alert("cheers!");

//audio
var contexto=new AudioContext();



fun=function(e){

  var osc=contexto.createOscillator();
  osc.frequency.value=216 * Math.pow(2,Math.ceil(Math.random()*7)/7);//or Math.random()*440+220;

  var ganancia=contexto.createGain();
  ganancia.gain.value = 0;

  osc.connect(ganancia);
  ganancia.connect(contexto.destination);
 
  let t=contexto.currentTime+Math.random()
  ganancia.gain.linearRampToValueAtTime(0.1,t)
  ganancia.gain.exponentialRampToValueAtTime(0.00001,t+Math.random())

  setTimeout(function(){osc.stop(t+2);osc.disconnect();ganancia.disconnect()},2000)

  ponEstrella(e);
  osc.start();

}

//visuals


var amp=10;
var alt=10;
var speed=false;

var percVel=300;
var noteVel=1000;
var radioCircle=2;
var radioCircleFinal=24;

var stage = new createjs.Stage("micanvas");
var canvasContext=document.getElementById("micanvas");

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.setFPS=10;
createjs.Ticker.addEventListener("tick", tick);

var body = document.body;
var  html = document.documentElement;


ponEstrella=function(e){// star

  var equis=20;//(radius/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  var igriega=20;//(radius/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang)) + alt/2;
  var vel=2000;
  var c = new createjs.Shape();
  c.graphics.beginFill("white").drawCircle(2, 2, radioCircle);
  if (e.name==undefined) {
    console.log("clic ")
    c.x = e.x;
    c.y = e.y+window.scrollY;
   }else{
    console.log("scroll");
    c.x=amp*(Math.random());
    c.y=e.scrollY+300;
  }
 
  stage.addChild(c);
  var tamanyo=Math.random()*radioCircleFinal;
  createjs.Tween.get(c)
    .to({scaleX:tamanyo, scaleY:tamanyo, alpha:0},vel, createjs.Ease.getPowOut(2))
    .call(handleComplete, [c]);
}


function tick(event) {
  stage.update()
}

window.onresize = function(event) {
  ajustaCanvas();
}
ajustaCanvas=function(){
  alt = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

  amp=canvasContext.width  = window.innerWidth;
  canvasContext.height = alt;

  radioCircle=amp/100;
  radioCircleFinal=amp/20;
}
function handleComplete(dispon) {
  dispon.removeAllEventListeners();
  stage.removeChild(dispon);
  dispon=null;

  intervalando=false;
  clearInterval(inter);
}
//events

var intervalando=false;
var inter;

onclick=fun;
onscroll=function(){if(!intervalando){ inter=setInterval(function(){ fun(this) }, 300); intervalando=true }}
onload=ajustaCanvas;
