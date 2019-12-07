const input = [3,8,1001,8,10,8,105,1,0,0,21,30,47,60,81,102,183,264,345,426,99999,3,9,1002,9,5,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,1002,9,4,9,4,9,99,3,9,101,2,9,9,1002,9,4,9,4,9,99,3,9,1001,9,3,9,1002,9,2,9,101,5,9,9,1002,9,2,9,4,9,99,3,9,102,4,9,9,101,4,9,9,1002,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,99];

function run(inputVals) {
  const program = [...input];
  let inputNum = 0;
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
        program[a] = inputVals[inputNum];
        inputNum++;
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