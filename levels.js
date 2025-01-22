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

const levels = [
  {
    id: 0,
    speed: 20,
    feature : 'name',
    armonic : []
  },
  {
    id: 1,
    speed: 11,
    feature : 'altura',
    values : range(60, 220),
    inputType : 'range',
    armonic : [],
  },
  {
    id: 2,
    speed: 5,
    feature : 'peso',
    values : range(40, 300),
    inputType : 'range',
    armonic : []
  },
  {
    id: 2,
    speed: 2,
    feature : 'edad',
    values : range(18, 120),
    inputType : 'range',
    armonic : []
  },{
    id: .2,
    speed: 80,
    feature : 'zodiaco',
    values : [],
    inputType : [ 'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'],
    armonic : []
  }
]