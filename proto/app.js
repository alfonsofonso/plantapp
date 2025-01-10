var notaBase=200;
var ctx;
var mainGain;
var arr=[];

empieza=function(){
    ctx=new AudioContext();
    ctx.resume();
    mainGain=ctx.createGain();
    mainGain.connect(ctx.destination);
    mainGain.gain.value=.5;
    creaVibra();
}

creaVibra=function(){
      creaNota(notaBase);   // tonica 
 l=notaBase*3/2   //intervalo de cuarta
 l=l*3/2;
 l*=3/2
 l*=3/2
 l=l/4
 console.log("l= ",l)
 creaNota(l)
 //creaNota(notaBase*3/2 + l)
    //creaNota(notaBase*5/4)
    //creaNota(notaBase*6/5)
    mainGain.value=1/arr.length
}

creaNota=function(f){
    var osc=ctx.createOscillator();
    var g=ctx.createGain()
    osc.frequency.value=f;
    console.log(f)
    g.gain.value=.5;
    arr.push(osc);
    osc.connect(g)
    g.connect(mainGain)
    osc.start()
    return(f)
}
