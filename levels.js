function range(start = 0, end, step = 1) {
  // Handle case where only one argument is passed (end is the argument)
  if (end === undefined) {
    end = start;
    start = 0;
  }

  // Handle cases where step is 0 or invalid
  if (step === 0) {
    throw new Error("Step cannot be 0");
  }

  const result = [];
  const isAscending = step > 0;

  // Populate the range
  for (let i = start; isAscending ? i < end : i > end; i += step) {
    result.push(i);
  }

  return result;
}

const soundMinMax = {
  duration: {
    min: 0,
    max: 100
  }
}

const levels = [
  {
    feature: 'currentMonth',
    mode: 'time',             //special
    speed: 20,
    min: null,             
    max: null,             
    values: [],           //only in array mode
    soundMod: 'numeroDeOctavas',
    cb: function() {
      const currentDate = new Date();
      const month = currentDate.getMonth();
      return mapNumRange(
        month, 
        0, 
        23,
        5, 
        85
      ) 
    }
  },
  {
    feature: 'name',
    mode: 'string',
    speed: 20,
    min: 1,              //in string mode indicates min chars
    max: 15,             //only in string mode indicates min chars
    values: [],           //only in array mode
    soundMod: 'notabase', //el factor de objeco s que va a modificar
    cb: function() {
      return str2MinMax(
        value,
        55,               //el min valor que puede soundMod
        100               //el min valor que puede soundMod
      )
    }
  },
  {
    feature: 'height',
    mode: 'number',
    speed: 20,
    min: 65,              
    max: 210,             
    values: [],           //only in array mode
    soundMod: 'duration',
    cb: function() {
      return mapNumRange(
        value, 
        this.min, 
        this.max,
        5, 
        1312
      )
    }
  },
  {
    feature: 'zodiac',
    mode: 'array',
    speed: 20,
    min: null,             
    max: null,             
    values: ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'],           //only in array mode
    soundMod: 'duration',
    cb: function() {
      return mapNumRange(
        value, 
        this.min, 
        this.max,
        5, 
        1312
      )
    }
  },  
  {
    feature: 'currentHour',
    mode: 'time',             //special
    speed: 20,
    min: null,             
    max: null,             
    values: [],           //only in array mode
    soundMod: 'numeroDeOctavas',
    cb: function() {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      return mapNumRange(
        hours, 
        0, 
        23,
        5, 
        85
      ) 
    }
  },
];  

  /* {
    speed: 20,
    feature : 'name',
    values: ['Luigi'],
    armonic : [],
    sound: 'duracion',
    min: 10,
    max: 66,
    mode: 'string'
  },
  {
    id: 1,
    speed: 11,
    feature : 'altura',
    values : range(60, 220),
    inputType : 'range',
    armonic : [],
    sound: 'duracion',
    min: 10,
    max: 66,
    mode: 'number'
  },
  {
    id: 2,
    speed: 5,
    feature : 'peso',
    values : range(40, 300),
    inputType : 'range',
    armonic : [],
    sound: 'duracion',
    min: 10,
    max: 66,
    mode: 'number'
  },
  {
    id: 2,
    speed: 9,
    feature : 'edad',
    values : range(18, 120),
    inputType : 'range',
    armonic : [],
    sound: 'duracion',
    min: 10,
    max: 66,
    mode: 'number' 
  } {
    id: .2,
    speed: 80,
    feature : 'zodiaco',
    /* values : [], 
    values : [ 'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'],
    armonic : [],
    sound: 'duracion',
    min: 10,
    max: 66,
    mode: 'string',
  } */