var d1 = new Date();

var input = ['R5', 'R4', 'R2', 'L3', 'R1', 'R1', 'L4', 'L5', 'R3', 'L1', 'L1', 'R4', 'L2', 'R1', 'R4', 'R4', 'L2', 'L2', 'R4', 'L4', 'R1', 'R3', 'L3', 'L1', 'L2', 'R1', 'R5', 'L5', 'L1', 'L1', 'R3', 'R5', 'L1', 'R4', 'L5', 'R5', 'R1', 'L185', 'R4', 'L1', 'R51', 'R3', 'L2', 'R78', 'R1', 'L4', 'R188', 'R1', 'L5', 'R5', 'R2', 'R3', 'L5', 'R3', 'R4', 'L1', 'R2', 'R2', 'L4', 'L4', 'L5', 'R5', 'R4', 'L4', 'R2', 'L5', 'R2', 'L1', 'L4', 'R4', 'L4', 'R2', 'L3', 'L4', 'R2', 'L3', 'R3', 'R2', 'L2', 'L3', 'R4', 'R3', 'R1', 'L4', 'L2', 'L5', 'R4', 'R4', 'L1', 'R1', 'L5', 'L1', 'R3', 'R1', 'L2', 'R1', 'R1', 'R3', 'L4', 'L1', 'L3', 'R2', 'R4', 'R2', 'L2', 'R1', 'L5', 'R3', 'L3', 'R3', 'L1', 'R4', 'L3', 'L3', 'R4', 'L2', 'L1', 'L3', 'R2', 'R3', 'L2', 'L1', 'R4', 'L3', 'L5', 'L2', 'L4', 'R1', 'L4', 'L4', 'R3', 'R5', 'L4', 'L1', 'L1', 'R4', 'L2', 'R5', 'R1', 'R1', 'R2', 'R1', 'R5', 'L1', 'L3', 'L5', 'R2'];

//increment = rotate right
var dirs = ['N','E','S','W'];

var rotate = function(direction, rotation) {
  var index = dirs.indexOf(direction);
  if (rotation === 'R') {
    index = (index + 1) % 4;
  } else {
    index = (index - 1);
    if (index < 0) { index = 3; }
  }
  return dirs[index];
}

var pos = [0,0];
var dir = 'N';

for(var i = 0; i < input.length; i++) {
  instruction = input[i];
  rotation = instruction[0];
  amount = Number(instruction.substring(1));
  dir = rotate(dir,rotation);
  switch (dir) {
    case 'N':
      pos[1] += amount;
      break;
    case 'S':
      pos[1] -= amount;
      break;
    case 'E':
      pos[0] += amount;
      break;
    case 'W':
      pos[0] -= amount;
      break;
  }
}

var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('Final position after following all directions: ' + (Math.abs(pos[0]) + Math.abs(pos[1])));

d1 = new Date();

pos = [0,0];
dir = 'N';
var seen = {};
var done = false;

for(var i = 0; i < input.length && !done; i++) {
  var instruction = input[i];
  var rotation = instruction[0];
  var amount = Number(instruction.substring(1));
  dir = rotate(dir,rotation);
  var mult = 1;
  var posInd = 0;
  switch (dir) {
    case 'N':
      posInd = 1;
      break;
    case 'S':
      posInd = 1;
      mult = -1;
      break;
    case 'W':
      mult = -1;
      break;
  }
  for (var j = 0; j < amount; j++) {
    pos[posInd] += mult;
    //look for a place we see twice
    var key = '' + pos[0] + pos[1]; 
    if(seen[key]) {
      done = true;
      break;
    }
    seen[key] = true;
  }
}
d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('First location visited twice: ' + (Math.abs(pos[0]) + Math.abs(pos[1])));
