// const input = [3,8,1001,8,10,8,105,1,0,0,21,30,47,60,81,102,183,264,345,426,99999,3,9,1002,9,5,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,1002,9,4,9,4,9,99,3,9,101,2,9,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,1002,9,2,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,102,4,9,9,101,4,9,9,1002,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99];
const input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];

function run(inputVals) {
  const program = [...input];
  let ip = 0;
  while (program[ip] !== 99) {
    let inst = `${program[ip]}`;
    let opcode = inst.length === 1 ? Number(inst) : Number(inst.substr(-2));
    let modes = inst.substring(0, inst.length-2).split('').reverse();
    let a = program[ip+1];
    let b = program[ip+2];
    let c = program[ip+3];

    let valA = modes[0] === '1' ? a : program[a];
    let valB = modes[1] === '1' ? b : program[b];

    let advAmt = 0;
    switch (opcode) {
      case 1:
        advAmt = 4;
        program[c] = valA + valB;
        break;
      case 2:
        advAmt = 4;
        program[c] = valA * valB;
        break;
      case 3:
        advAmt = 2;
        program[a] = inputVals.shift();
        break;
      case 4:
        advAmt = 2;
        return program[a];
      case 5:
        if (valA) {
          ip = valB;
        } else {
          advAmt = 3;
        }
        break;
      case 6:
        if (!valA) {
          ip = valB;
        } else {
          advAmt = 3;
        }
        break;
      case 7:
        program[c] = valA < valB ? 1 : 0;
        advAmt = 4;
        break;
      case 8:
        program[c] = valA === valB ? 1 : 0;
        advAmt = 4;
        break;
      default:
        console.log(`unhandled opcode ${opcode}`);
        return;
    }
    ip += advAmt;
  }
}

let iOut, jOut, kOut, lOut, mOut;
let max = 0;
for(let i = 0; i < 5; i++) {
  iOut = run([i, 0]);
  for(let j = 0; j < 5; j++) {
    if (j === i) { continue; }
    jOut = run([j, iOut]);
    for(let k = 0; k < 5; k++) {
      if (k === i || k === j) { continue; }
      kOut = run([k, jOut]);
      for(let l = 0; l < 5; l++) {
        if (l === i || l === j || l === k) { continue; }
        lOut = run([l, kOut]);
        let m = 10 - (i + j + k + l);
        mOut = run([m, lOut]);
        if (mOut > max) { max = mOut; }
      }
    }
  }
}

console.log(`Maximum is ${max}`);

// part 2
let lastRunOutput;

function runPartial(program, ip, inputVals) {
  console.log(`running with ip=${ip} and inputs ${inputVals}`);
  let outputs = [];
  while (program[ip] !== 99) {
    let inst = `${program[ip]}`;
    let opcode = inst.length === 1 ? Number(inst) : Number(inst.substr(-2));
    let modes = inst.substring(0, inst.length-2).split('').reverse();
    let a = program[ip+1];
    let b = program[ip+2];
    let c = program[ip+3];

    let valA = modes[0] === '1' ? a : program[a];
    let valB = modes[1] === '1' ? b : program[b];

    let advAmt = 0;
    switch (opcode) {
      case 1:
        advAmt = 4;
        program[c] = valA + valB;
        break;
      case 2:
        advAmt = 4;
        program[c] = valA * valB;
        break;
      case 3:
        advAmt = 2;
        if (inputVals.length === 0) {
          // Need INPUT
          return [program, ip, outputs];
        }
        program[a] = inputVals.shift();
        console.log(`inputting ${program[a]}`);
        break;
      case 4:
        advAmt = 2;
        console.log(`outputting ${program[a]}`);
        lastRunOutput = program[a];
        outputs.push(program[a]);
        break;
      case 5:
        if (valA) {
          ip = valB;
        } else {
          advAmt = 3;
        }
        break;
      case 6:
        if (!valA) {
          ip = valB;
        } else {
          advAmt = 3;
        }
        break;
      case 7:
        program[c] = valA < valB ? 1 : 0;
        advAmt = 4;
        break;
      case 8:
        program[c] = valA === valB ? 1 : 0;
        advAmt = 4;
        break;
      default:
        console.log(`unhandled opcode ${opcode}`);
        return;
    }
    ip += advAmt;
  }
}

function runFeedbackLoop(phs1, phs2, phs3, phs4, phs5) {
  console.log(`running feedback loop with phases [${phs1},${phs2},${phs3},${phs4},${phs5}]`);
  let programs = [[...input], [...input], [...input], [...input], [...input]];
  let ips = [0,0,0,0,0];
  let outputs = [[phs2], [phs3], [phs4], [phs5], [phs1, 0]];
  let finished = false;

  const tryPartialRun = (i) => {
    let prevRunIndex = i-1;
    prevRunIndex = prevRunIndex < 0 ? 4 : prevRunIndex;
    if (outputs[prevRunIndex].length === 0) {
      // nothing to run on
      return;
    }
    console.log(`\n\ntrying partial run ${i}.`);
    const result = runPartial(programs[i], ips[i], outputs[prevRunIndex]);
    if (result) {
      programs[i] = result[0];
      ips[i] = result[1];
      outputs[i] = outputs[i].concat(result[2]);
      console.log(`returned ip of ${ips[i]} and output [${outputs[i]}]`);
    } else {
      finished = true;
    }
  }

  while(!finished) {
    for(let i = 0; i < 5; i++) {
      tryPartialRun(i);
    }
  }
  console.log(`last output was ${lastRunOutput}`);
}

runFeedbackLoop(9,7,8,5,6);
console.log(lastRunOutput);

// max = 0;
// for(let i = 5; i < 10; i++) {
//   for(let j = 5; j < 10; j++) {
//     if (j === i) { continue; }
//     for(let k = 5; k < 10; k++) {
//       if (k === i || k === j) { continue; }
//       for(let l = 5; l < 10; l++) {
//         if (l === i || l === j || l === k) { continue; }
//         let m = 35 - (i + j + k + l);
//         runFeedbackLoop(i, j, k, l, m);
//         if (lastRunOutput > max) { max = lastRunOutput; }
//         lastRunOutput = 0;
//       }
//     }
//   }
// }
// console.log(`Feedback loop yields max of ${max}`);