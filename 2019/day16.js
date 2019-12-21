let input = '59717513948900379305109702352254961099291386881456676203556183151524797037683068791860532352118123252250974130706958763348105389034831381607519427872819735052750376719383812473081415096360867340158428371353702640632449827967163188043812193288449328058464005995046093112575926165337330100634707115160053682715014464686531460025493602539343245166620098362467196933484413717749680188294435582266877493265037758875197256932099061961217414581388227153472347319505899534413848174322474743198535953826086266146686256066319093589456135923631361106367290236939056758783671975582829257390514211329195992209734175732361974503874578275698611819911236908050184158';
// input = '12345678';
input = input.split('').map((s) => {
  return Number(s);
});

function applyPattern(list, pattern) {
  let j = 1;
  let sum = 0;
  for (let i = 0; i < list.length; i++) {
    sum += list[i] * pattern[j];
    j = (j + 1) % pattern.length;
  }
  return Math.abs(sum % 10);
}

function generatePattern(n) {
  const pattern = [];
  [0,1,0,-1].forEach((x) => {
    for (let i = 0; i <= n; i++) {
      pattern.push(x);
    }
  });
  return pattern;
}

function applyPhase(list) {
  const output = [];
  for (let i = 0; i < list.length; i++) {
    output.push(applyPattern(list, generatePattern(i)));
  }
  return output;
}

function FFT(n, list) {
  for(let i = 0; i < n; i++) {
    list = applyPhase(list);
  }
  return list;
}

let result = FFT(100, [...input]).join('');
console.log(result.substring(0,8));
// let list2 = [];
// for (let i = 0; i < 100000; i++) {
//   list2 = list2.concat(input);
// }
// result = FFT(100, list2).join('');
// console.log(result.substring(0,8));