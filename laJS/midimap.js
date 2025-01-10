//midimap needs a funciones array and some ids
var mapping=false;
var funcSelected;
var botonClicado;
var caja=document.getElementById("midimapper")
let infinito=false;
var arrDatosMidi=[];
var sesentaicuatros;

function midimap(){
  if(mapping){
    caja.style="display:none";
    mapping=false
    funcSelected="";
    sesentaicuatros=0
    arrDatosMidi=[];

  }else{
    caja.style="display:block";
    caja.style.height=alt*.8;
    caja.style.width=amp*.8;
    arrDatosMidi=[];
    mapping=true;
  }
}

buttover=function(d){
  d.path[0].style.backgroundColor="yellow"
}
buttout=function(d){
  d.path[0].style.backgroundColor=""
}

buttclick=function(d){//clico funcion para asignar
  botonClicado=d.path[0].parentElement.parentElement;// fila
  funcSelected=d.path[0].textContent;//recojo el nombre de la función
}

function addFunctions(){//dibuja tabla
  var tabla=document.getElementById("mitabla");

  for (let i in mapaMidi) {

    var bot=document.createElement("div");

    let t = document.createTextNode(i);
    let d=document.createElement("div");
    let d2=document.createElement("div");
    let t2 = document.createTextNode(mapaMidi[i][0]+" - "+mapaMidi[i][1]);
   
    let row=tabla.insertRow();

    let cel1=row.insertCell(0);
    bot.className="boto";
    bot.onmouseover=buttover;
    bot.onmouseout=buttout;
    bot.onclick=buttclick;
    bot.appendChild(t);

    cel1.appendChild(bot)
    let cel2=row.insertCell(1);
    d.appendChild(t2);
    d.className="knob";
    cel2.appendChild(d);

    let cel3=row.insertCell(1);
    d2.appendChild(t2);
    d2.className="knob";
    cel3.appendChild(d2);
  }
}

function mapea(d){// estoy mapeando y recibo MIDI data
  let tipo=""
  if(d.data.length>2){// not dumb bottom mapping
    
    arrDatosMidi.push(d.data);
      

    if(arrDatosMidi.length>3){// cuando tengo 4 datos miro si 2 son 64 entonces infinite==true
      

      if (arrDatosMidi[0][0]==arrDatosMidi[2][0] && arrDatosMidi[0][0]!==arrDatosMidi[1][0]){
        tipo="boton";
        mapaMidi[funcSelected]=[d.data[0],d.data[1]];//asigno el num del knob a la funcion
        botonClicado.children[1].children[0].textContent = d.data[0]+" - "+d.data[1] // escribo numeros en pantalla
        botonClicado.children[2].children[0].textContent = tipo;
        console.log("mapeo "+tipo);
            arrDatosMidi=[];
        return                      //es un boton 
      }
    
      for (var i=0; i<arrDatosMidi.length; i++) { // mira si hay 64s
        if (arrDatosMidi[i][2]==64){ sesentaicuatros++}
      }
      if(sesentaicuatros>1){// si encuentro 64s en los mensajes...
        tipo="encoder";
        infinito=true;   /// es encoder
      }else{
        tipo="pote";
        infinito=false;   /// es potenciometro
      }
    
      mapaMidi[funcSelected]=[d.data[0],d.data[1],infinito];//asigno el num del knob a la funcion
      botonClicado.children[1].children[0].textContent = d.data[0]+" - "+d.data[1] // escribo numeros en pantalla
      botonClicado.children[2].children[0].textContent = tipo; 
      console.log("mapeo "+tipo);
      arrDatosMidi=[];
      sesentaicuatros=0;
      tipo="";
    }

  }else{// dumb boton mapping
     mapaMidi[funcSelected]=[d.data[0],d.data[1],infinito];//asigno el num del knob a la funcion// quito: d.srcElement.name
     console.log("mapeo boton creo")
  }
  
}

function mueveknob(k){// recibo mensaje midi   k=midi message
  if(k.data.length<3){mueveAlgo(k.data)}// no es un knob, probablente un boton 
  
  for (let i in mapaMidi) {// i== nombre función
    if(mapaMidi[i][1]==k.data[1]){// con ese knob...
      infinito=mapaMidi[i][2];// definimos el segundo parametro
      eval(i+"(" + k.data[2] +","+infinito+")"); // y zasca  ejecutamos: i(v,infi)
      return  // se puede borrar el return para potes con mas de una funcion?
    }
  }
}

mueveAlgo=function(data){// para mensajes midi de dos numeros
  if (data.length==2){
    eval(mapaMidi[data[1]][0])(v,infinito);//le he quitado el Fast
  }else{
    console.log("data.length==1 o menos")
  }
}

function muestraBot(d){
  document.getElementById("MIDI").style.backgroundColor="green";
}
function escondeBot(d){
    document.getElementById("MIDI").style.backgroundColor="black";
}

