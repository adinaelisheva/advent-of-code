var input = ['cpy 1 a','cpy 1 b','cpy 26 d','jnz c 2','jnz 1 5','cpy 7 c','inc d','dec c','jnz c -2','cpy a c','inc a','dec b','jnz b -2','cpy c b','dec d','jnz d -6','cpy 13 c','cpy 14 d','inc a','dec d','jnz d -2','dec c','jnz c -5'];

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
  for(var i = 0; i < input.length; i++) {
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
    }
  }
  return registers;
}

var d1 = new Date();
var registers = run({a:0,b:0,c:0,d:0});
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('At first, register a has value ' + registers['a']);

d1 = new Date();
var registers = run({a:0,b:0,c:1,d:0});
d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('After initializing c, register a has value ' + registers['a']);