// Stored here since I use it in so many days

function run() {
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
        program[index] = input;
        break;
      case 4:
        // output
        console.log(valA);
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