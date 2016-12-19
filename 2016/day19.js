var number = 3017957;
var presents = [];

for(var i = 0; i < number; i++) {
  presents.push(1);
}

var currElf = 0;
var currElves = number;

findNextElf = function() {
  var nextElf = (currElf + 1) % number;
  while(!presents[nextElf]) {
    nextElf = (nextElf + 1) % number;
  }
  return nextElf;
}

while(currElves > 1) {
  var nextElf = findNextElf();
  presents[currElf] += presents[nextElf];
  presents[nextElf] = 0;
  currElves--; //since we've deleted an elf
  if(currElves === 1) {
    //add one to account for index-1 numbering
    console.log('Elf ' + (currElf + 1) + ' remains ');
  } else {
    currElf = findNextElf();
  }
}
