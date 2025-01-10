var gotas=33;
var grosor=1;
var ruido;
var filtro;
var lloviendo=false;
var noiseLevel=0.75;
let tonoGris=200;
function setup() {
  createCanvas(innerWidth-20, innerHeight);
  frameRate(20)
}


function draw() {
  clear();
  if(lloviendo){
    for(var i=0;i<gotas;i++){
      gota();
    }
  }
}


gota=function(){
  
  stroke(tonoGris);
  strokeWeight(Math.random()*grosor);
  let posicion=Math.random()*width;
  line(posicion,Math.random()*height,posicion,Math.random()*height)
  //frameRate(Math.ceil(Math.random()*30))
}

llueve=function(){
  
  if (ruido==undefined){
    creaRuido()
    lloviendo=true;
    document.getElementById('botRain').style.backgroundColor="rgba(60,60,250,.8)";
    document.getElementById('botRain').style.color = "white";
    rainContr.style.display="block";//from visuals 
    showSlidRain.value=1;
    console.log("empieza a llover")
  }else{

    if(lloviendo){
      ruido.amp(0, 3,.1);
      lloviendo=false;
      document.getElementById('botRain').style.backgroundColor="rgba(10,10,100,.0)";
      document.getElementById('botRain').style.color = "rgba(10,10,256,1)";

      console.log("parece que ha parao")
    }else{
      document.getElementById('botRain').style.backgroundColor="rgba(60,60,250,.8)";
      document.getElementById('botRain').style.color = "white";
        ruido.amp(noiseLevel , 3, 0.1);
      lloviendo=true;
      console.log("llueve otra vez")
    }
  }
}

function creaRuido(){
  ruido=new p5.Noise("brown")
  ruido.disconnect()
  filtro=new p5.BandPass();
  ruido.connect(filtro);
  filtro.freq(850);
  filtro.res(4)
  ruido.start();
  ruido.amp(0);
  ruido.amp(noiseLevel,2, .5) 
}


//////////////////////////    volumen lluvia
var volRu = document.getElementById("volumenRudio");
var volRuidoSpan = document.getElementById("volumenRuidoSpan");
volRu.oninput = function() {
    ruido.amp(this.value/100);
    noiseLevel=this.value/100;
   volRuidoSpan.innerText=volRu.value.toString();
  tonoGris=this.value*2.5;
console.log("volumen lluvia")
}

/* volumenLluvia=function(e){
  if(e-64>0){
    ruido.output.gain.value+=.01;
    volRuidoSpan.innerText++;
  volRu.value++;
  }else if(e-64<0){
    ruido.output.gain.value-=.01
    volRuidoSpan.innerText--;
  volRu.value--;
  }
  
} */
////////////////////////   frequencia   //////
var freqRu = document.getElementById("frecuenciaRudio");
var freqRuidoSpan = document.getElementById("frecuenciaRuidoSpan");
freqRu.oninput = function() {
 filtro.freq(parseInt(freqRu.value))
  freqRuidoSpan.innerText=freqRu.value.toString();

}

///////////////7   resonancia  filtro   //////////
var resRu = document.getElementById("resonanciaRudio");
var resRuidoSpan = document.getElementById("resonanciaRuidoSpan");
resRu.oninput = function() {
  let reso=Math.pow(resRu.value,3)/10000;
  filtro.res(reso);
  resRuidoSpan.innerText=parseInt(reso*1000)/1000;
  grosor=reso*reso/12+.4;//visuals
if(reso>0.1){gotas=50/reso}
  console.log("value:",this.value)
}
var fluon=100;

fluye=function(){/// para un setInterval
  let variacion=Math.random()-.5;
  let varia=filtro.res()+variacion/fluon;
  filtro.res(varia);  
  resRu.value=varia;
  resRuidoSpan.textContent=varia;
  console.log("fluyo",varia)
}