var input1 = ['cpy a b','dec b','cpy a d','cpy 0 a','cpy b c','inc a','dec c','jnz c -2','dec d','jnz d -5','dec b','cpy b c','cpy c d','dec d','inc c','jnz d -2','tgl c','cpy -16 c','jnz 1 c','cpy 93 c','jnz 72 d','inc a','inc d','jnz d -2','inc c','jnz c -5'];
var input2 = ['cpy a b','dec b','cpy a d','cpy 0 a','cpy b c','inc a','dec c','jnz c -2','dec d','jnz d -5','dec b','cpy b c','cpy c d','dec d','inc c','jnz d -2','tgl c','cpy -16 c','jnz 1 c','cpy 93 c','jnz 72 d','inc a','inc d','jnz d -2','inc c','jnz c -5'];
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

var isValidInst = function(inst) {
  switch(inst[0]) {
    case 'cpy':
      if(regNames.indexOf(inst[2]) === -1) { return false; }
      break;
    case 'inc':
    case 'dec':
      if(regNames.indexOf(inst[1]) === -1) { return false; }
      break;
  }
  return true;
}

var run = function(registers,input) {
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
        var val1 = getValue(inst[1], registers);
        var val2 = getValue(inst[2], registers);
        if(val1 !== 0) {
          i += (val2 - 1);
        }
        break;
      case 'tgl':
        var val = i + getValue(inst[1], registers);
        var affected = input[val];
        if(affected) {
          var words = affected.split(' ');
          switch (words[0]) {
            case 'inc':
              words[0] = 'dec';
              break;
            case 'dec':
            case 'tgl':
              words[0] = 'inc';
              break;
            case 'jnz':
              words[0] = 'cpy';
              break;
            case 'cpy':
              words[0] = 'jnz';
              break;
          }
          if(isValidInst(words)) {
            input[val] = words.join(' ');
          }
        }
    }
  }
  return registers;
}

var d1 = new Date();
var registers = run({a:7,b:0,c:0,d:0},input1);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('With 7 eggs, register a has value ' + registers['a']);

d1 = new Date();
var registers = run({a:12,b:0,c:0,d:0},input2);
d2 = new Date();
//parse part 2 into mins and secs since it's long-running
var secs = (d2.getTime() - d1.getTime())/1000;
var mins = Math.floor(secs/60);
secs = secs - (mins*60);
secs = Math.floor(secs * 1000)/1000; //chop off trailing digits
console.log('\n'+mins+'m'+secs+'s');
console.log('With 12 eggs, register a has value ' + registers['a']);
