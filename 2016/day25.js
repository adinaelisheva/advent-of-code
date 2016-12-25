var input = ['cpy a d','cpy 11 c','cpy 231 b','inc d','dec b','jnz b -2','dec c','jnz c -5','cpy d a','jnz 0 0','cpy a b','cpy 0 a','cpy 2 c','jnz b 2','jnz 1 6','dec b','dec c','jnz c -4','inc a','jnz 1 -7','cpy 2 b','jnz c 2','jnz 1 4','dec b','dec c','jnz 1 -4','jnz 0 0','out b','jnz a -19','jnz 1 -21'];

regNames = ['a','b','c','d'];

var getValue = function(numOrReg, registers) {
  var num = Number(numOrReg);
  if(!isNaN(num)) {
    return num;
  }
  if(regNames.indexOf(numOrReg) > -1) {
    return registers[numOrReg];
  }
}

var run = function(registers) {
  var expected = 0;
  var outcount = 0;
  for(var i = 0; i < input.length && outcount < 10; i++) {
    var inst = input[i].split(' ');
    switch(inst[0]) {
      case 'cpy':
        var val = getValue(inst[1], registers);
        registers[inst[2]] = val;
        break;
      case 'inc':
        registers[inst[1]] = registers[inst[1]]+1;
        break;
      case 'dec':
        registers[inst[1]] = registers[inst[1]]-1;
        break;
      case 'jnz':
        var val = getValue(inst[1], registers);
        if(val !== 0) {
          i += (Number(inst[2]) - 1);
        }
        break;
      case 'out':
        var val = getValue(inst[1], registers);
        //fail out if it's the wrong digit
        if(Number(val) !== expected) { return false; }
        expected = (expected + 1) % 2;
        outcount++;
        break;
    }
  }
  //if we got here we have 0,1,0...s for 10 digits. Make the cheap (but apparently
  //valid!) assumption that if it works for 10 digits, it's the right one
  return true;
}

for(var i = 1; ; i++) {
  if(run({a:i,b:0,c:0,d:0})) { 
    console.log('Initialize a to ' + i);
    break;
  }
}