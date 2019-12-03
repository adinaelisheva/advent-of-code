const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,13,19,1,9,19,23,2,13,23,27,2,27,13,31,2,31,10,35,1,6,35,39,1,5,39,43,1,10,43,47,1,5,47,51,1,13,51,55,2,55,9,59,1,6,59,63,1,13,63,67,1,6,67,71,1,71,10,75,2,13,75,79,1,5,79,83,2,83,6,87,1,6,87,91,1,91,13,95,1,95,13,99,2,99,13,103,1,103,5,107,2,107,10,111,1,5,111,115,1,2,115,119,1,119,6,0,99,2,0,14,0];

function run(noun, verb) {
  let program = [...input];
  program[1] = noun;
  program[2] = verb;

  let ip = 0;
  while (program[ip] !== 99) {
    let opcode = program[ip];
    let a = program[ip+1];
    let b = program[ip+2];
    let pos = program[ip+3];
    switch (opcode) {
      case 1:
        program[pos] = program[a] + program[b];
        break;
      case 2:
        program[pos] = program[a] * program[b];
        break;
    }
    ip += 4;
  }
  return program[0];
}

// restore the gravity assist program to the "1202 program alarm" state
const result = run(12, 2);
console.log(`gravity assist halted with ${result} at 0`);

// Now to find what program will get the value we need
const target = 19690720;
for (let n = 0; n < 100; n++) {
  for (let v = 0; v < 100; v++) {
    let result = run(n, v);
    if (result === target) {
      console.log(`Noun: ${n} Verb: ${v} Result: ${100 * n + v}`);
      return;
    }
  }
}