//planets

var starLoc=true;//lineas de mirilla
var velSpacial=50000;
var radioCircle=2;
var radioCircleFinal=24;
var gris=255;
var grisRandom=true;
var starLocThick=1;
var starLocMaxThick=300;
var equis, igriega;
var starLocColor="rgb(256,256,256)";
var radioVelo=false;//la key velociti influye en el radio del planeta
var horizon=alt/2;
let vertical=true;
let fadeTime=10000;

function ponEstrella(a,v,s){// es un circulo-planta-cuadrado-nave
  //return  // se llama desde track.envelope del lissalousjs
  //
  s=s.sustain;
  console.log(a,v,s);
  s=Math.random();
  let vel;
  let ang= Math.random()*360;
  let radius=radio+margen;
  equis=(radius/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  igriega=(radius/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang))+alt/2;

  vel=duracion*256//// atenncios
  //vel=velSpacial;/// nope

  let radioVel=radioCircle///////////////
  if(radioVelo){radioVel*v/10}
  if (grisRandom){gris=Math.random()*512}//////////////
  var c = new createjs.Shape();
  let micolor="rgb(0   255 0)"//
  micolor="rgb("+gris/2+" 255 "+gris/2+")";

  c.graphics.beginFill(micolor)
  //rgbToHex(Math.round(256*s),Math.round(256*s),Math.round(256*s)))
    .drawCircle(2/s, 2/s, radioVel/s);
  c.x = equis
  c.y = igriega;
  c.alpha=0;
  stage.addChild(c);
  
  var tamanyo=Math.random()*radioCircleFinal;
//ataque
  createjs.Tween.get(c).to({alpha:1},100).call(viaja,[c,radius,ang,tamanyo,vel]);
   
}
function viaja(c,radius,ang,tamanyo,vel){
      createjs.Tween.get(c)
        .to({ x:radius * Math.cos(ang)+amp/2,y:radius*Math.sin(ang)+alt/2,
        scaleX:tamanyo, scaleY:tamanyo},vel, createjs.Ease.getPowIn(2))
        .call(handleComplete, [c]);

}


function creaDestello(x,y){
  if(!starLoc){return}
  var destello=new createjs.Shape();
  starLocColor=getRandomGris()

  if (vertical){
    destello.graphics.beginFill(starLocColor).drawRect(horizon/2,-alt,starLocThick,alt*2);//vertical
    destello.x=x*Math.random()*2;destello.y=y;
  }else{
    destello.graphics.beginFill(starLocColor).drawRect(-2000,horizon/2,8000,starLocThick);//horizontal
    destello.x=x;destello.y=y*(Math.random()/8);
  }
  //console.log("destell:"+x+" "+y)
  stage.addChild(destello);
  createjs.Tween.get(destello).to({alpha:0 }, fadeTime).call(handleComplete, [destello]);
}//lineas


function velocidad(a,i){// velSpacial
  if(!i){//1-127
    velSpacial=a*a*8;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>120000){
      velSpacial=120000;}
  }else{// si es encoder
    let e=a-64;
    velSpacial+=e*100;
    if(velSpacial<0){velSpacial=0;//corrector
    }else if(velSpacial>120000){
      velSpacial=120000;}
    }
  console.log("velSp: "+velSpacial+" "+i);
}

function radioPlaneta(a,i){
  if(!i){
    radioCircle=a/4;
  }else{//encoder
    radioCircle+=a-64;
  }
  if (radioCircle<1){radioCircle=1}else if(radioCircle>32){radioCircle=32}//corrector
  console.log("radioPlantet:" +radioCircle)
}//radio planets

function distanciaPlaneta(a,i){//radio planets when near
  if(!i){
      radioCircleFinal=a*4;
    }else {
      radioCircleFinal+=(a-64);
    }
  if(radioCircleFinal<0){
     radioCircleFinal=0;
  }else if(radioCircleFinal>500){
      radioCircleFinal=500;
  }
  console.log("distanciaPlanteta:" +radioCircleFinal);
}

function luzPlaneta(a,i){
  if(!i){
    gris=a*2;
  }else if(gris>0&&gris<256){
      gris+=a-64;
  }
  console.log("#" +gris)
}

function luzPlanetaAlienSWITCH(d,v){
  if(d==0){return}
  if(grisRandom){grisRandom=false}else{grisRandom=true}
  console.log("luzPlanetaAlienSWITCH: "+grisRandom);
}

function locationSWITCH(d,v){
  if(d==0){return}
  if(starLoc){starLoc=false}else{starLoc=true}
    console.log("locationSWITCH: "+starLoc);
}

function clearButtonSWITCH(d,v){

    console.log("clear!");
    stage.removeAllChildren();

}

function starLocThickness(d,inf){
  if(!inf){
    starLocThick=Math.random()*d*10+1;
  }else{
    starLocThick+=d-64;
  }

    console.log("thickness:"+starLocThick)
}
function verticalitySWITCH(d,v){
  if(d==0){return}
  if (vertical){vertical=false}else{vertical=true}
    console.log("vertical: "+vertical)
}

function horizonHeight(d,inf){
  if(!inf){
    horizon=d/32*alt-2*alt;
  }else{
    horizon+=(d-64);
  }
  console.log("horizon: "+horizon)
}

function landFadeTime(d,inf){
  if(!inf){
    fadeTime=d*500;
  }else{
    fadeTime+=(d-64)*10;
  }
  console.log("fadeTime: "+fadeTime)
}

