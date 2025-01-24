/* console.log('testjs')

const text = 'Maximo'

let min = 20
let max = 5000 */

const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const str2n1000 = (str) => {
  let result = 0;
  const cen = str.charCodeAt(0) % 10;
  const dec = str.length % 10;
  const uni = str.charCodeAt(str.length -1) % 10;
  console.log(uni)
  result = cen * 100 + dec * 10 + uni;
  return result;
};

const str2MinMax = (str, min, max) => {
  let num = str2n1000(str);
  return mapNumRange(num, 0, 999, min, max);
};

/* console.log(str2n1000(text))
console.log(str2MinMax(text, min, max)) */