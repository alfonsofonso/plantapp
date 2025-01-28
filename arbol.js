var arbol= {
    biometric: {
        nombre:"Jose",
        altura:170,
        peso:60,
        edad:18
    },
    entorno: {
        localizacion:[0,0],
        temperatura:20,
        presion:1000,
        viajes: [
            "Giza",
            "tenoctiklan",
            "stonehenge",
            "ibiza"
        ],
    },
    objetivos:{
        relax:true,
        dormir:false,
        concentracion:false,
        atraccion:false
    },
    teorias:{
        solfeggio:false,
        shumman:false,
        chacras:false,
        sheppard:false
    },
}


so={//aun no implementado
    mainVol:.8,//0-1
    notaBase:52,//10-72
    numeroDeOctavas:4,//1-8... relacionado con notabase
    duracion:100,// 1-1000
    escalas:['ionian','melodicminor','wholetone','diminished','blues','pentatonicmajor',
        'pentatonicminor','flamenco','altered','bebopdominant','bebopdominantflatnine',
        'bebopmajor','bebopminor','major','major7','major6','dominant','dominantflat5',"augmented",
        'minor','minor7','minor6','dim','minorflat5','sus4','sus2','fouths','fifth','tritone',
        'hexatonic','chromatic',"octaves"],
    aroma:escalas[5],//escala actual
    nombresNotas:["C", "Db", "D", "Eb", "E","F", "Gb", "G", "Ab", "A", "Bb", "B" ],
    silencios:100//por determinar

}