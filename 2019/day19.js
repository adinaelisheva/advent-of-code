const input = [109,424,203,1,21102,11,1,0,1105,1,282,21101,18,0,0,1106,0,259,2101,0,1,221,203,1,21101,0,31,0,1105,1,282,21101,0,38,0,1106,0,259,21001,23,0,2,21202,1,1,3,21102,1,1,1,21102,57,1,0,1105,1,303,2101,0,1,222,21002,221,1,3,20101,0,221,2,21101,259,0,1,21101,0,80,0,1105,1,225,21102,198,1,2,21102,91,1,0,1106,0,303,1201,1,0,223,21002,222,1,4,21101,0,259,3,21102,225,1,2,21102,225,1,1,21102,1,118,0,1106,0,225,21001,222,0,3,21101,0,140,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21102,1,148,0,1106,0,259,2101,0,1,223,21002,221,1,4,21002,222,1,3,21101,0,24,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,1,195,0,106,0,108,20207,1,223,2,21001,23,0,1,21102,1,-1,3,21102,1,214,0,1106,0,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1201,-4,0,249,21202,-3,1,1,22101,0,-2,2,21202,-1,1,3,21102,1,250,0,1105,1,225,22101,0,1,-4,109,-5,2106,0,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2106,0,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22101,0,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,22102,1,-2,3,21101,0,343,0,1105,1,303,1106,0,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,22101,0,-4,1,21102,1,384,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21201,1,0,-4,109,-5,2105,1,0];

// Stored here since I use it in so many days
const POS_MODE = '0'; // val = position in array
const IMM_MODE = '1'; // val = value. will never be used for params it writes to
const REL_MODE = '2'; // val = position in array + relative base

function run(inputVals) {
  const program = [...input];
  let relativeBase = 0;
  let ip = 0;
  while (program[ip] !== 99) {
    let inst = `${program[ip]}`;
    let opcode = inst.length === 1 ? Number(inst) : Number(inst.substr(-2));
    let modes = inst.substring(0, inst.length-2).split('').reverse();
    let a = program[ip+1];
    let b = program[ip+2];
    let c = program[ip+3];

    let valA = modes[0] === IMM_MODE ? a : (modes[0] === REL_MODE ? program[a + relativeBase] : program[a]);
    let valB = modes[1] === IMM_MODE ? b : (modes[1] === REL_MODE ? program[b + relativeBase] : program[b]);
    let indexC = modes[2] === REL_MODE ? c + relativeBase : c;
    valA = valA ? valA : 0;
    valB = valB ? valB : 0;

    let advAmt = 0;
    switch (opcode) {
      case 1:
        advAmt = 4;
        program[indexC] = valA + valB;
        break;
      case 2:
        advAmt = 4;
        program[indexC] = valA * valB;
        break;
      case 3:
        // input
        advAmt = 2;
        let index = modes[0] === REL_MODE ? a + relativeBase : a;
        program[index] = inputVals.shift();
        break;
      case 4:
        // output
        advAmt = 2;
        return valA;
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
        program[indexC] = valA < valB ? 1 : 0;
        advAmt = 4;
        break;
      case 8:
        program[indexC] = valA === valB ? 1 : 0;
        advAmt = 4;
        break;
      case 9:
        relativeBase += valA;
        advAmt = 2;
        break;  
      default:
        console.log(`unhandled opcode ${opcode}`);
        return;
    }
    ip += advAmt;
  }
}

let count = 0;
for (let x = 0; x < 50; x++) {
  let row = "";
  for (let y = 0; y < 50; y++) {
    let output = run([x,y]);
    count += output;
    row += output ? '#' : '.';
  }
  console.log(row);
}
console.log(`${count} spots affected in 50x50 grid`);

let rowCounts = [];
let firstRow;
let map = {};
let offset = 99;
let lastCount = lastLastCount = rowCount = 0;
for (let r = 1000; true; r++) {
  if (r % 100 === 0) {
    console.log(`${r}...`);
  }
  for (let c = 1000; c < 2000; c++) {
    if (run([c,r]) && run([c+offset,r]) && run([c,r+offset]) && run([c+offset,r+offset])) {
      console.log(`First 100x100 square is at [${r}, ${c}] - ${c*10000 + r}`);
      return;
    }
  }
}