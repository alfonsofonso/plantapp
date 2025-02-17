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
    id: 0,
    speed: 20,
    feature : 'name',
    values:range(30, 90),
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
    min: 10,
    max: 66,
    mode: 'number'
  }/* {
    id: .2,
    speed: 80,
    feature : 'zodiaco',
    /* values : [], 
    values : [ 'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'],
    armonic : [],
    sound: 'duracion',
    min: 10,
    max: 66,
    mode: 'select',
  } */
]