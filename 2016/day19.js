var number = 3017957;
var d1 = new Date();

var run = function(number,part1) {
  var total = number;
  var root = {index:1};
  var curr = root;
  for(var i = 1; i < number; i++) {
    curr.next = {index: i+1};
    curr = curr.next;
  }
  curr.next = root; //loop it around

  var currElf = root;
  while(currElf.next.index !== currElf.index) {
    if(part1) {
      //just delete my neighbor
      currElf.next = currElf.next.next;
    } else {
      //subtract one because we're actually killing the "dead elf's" NEXT neighbor
      var half = Math.floor(total/2) - 1;
      var deadElf = currElf;
      while(half) {
        deadElf = deadElf.next;
        half--;
      }
      deadElf.next = deadElf.next.next; //delete the elf across
      total--; //keep track of the kills
      if((total % 1000) === 0) { console.log(total);}
    }
    currElf = currElf.next;
  }
  if(part1) {
    return 'After removing next neighbors, elf ' + currElf.index + ' remains ';
  } else {
    return number + '-' + currElf.index;
  }
}

//this is the slow way of doing it, but it does work
var ret = run(number,true);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);

d1 = new Date();
//mathematical way based on https://www.youtube.com/watch?v=uCsD3ZGzMgE
var powerOf2 = Math.pow(2,Math.floor(Math.log2(number)));
var diff = number - powerOf2;
var answer = diff*2 + 1;
d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('Doing it mathematically: it\'s still elf ' + answer);

//generate a table for some part2 data
// for(var i = 3; i < 100; i++) {
//   run(i,false);
// }

//conclusion for part 2: it starts over at 1 when it would exceed the number of people
//if the current run starts at 1 with n people, it goes up by 1 every time, until it
//passes n, then it starts incrementing by 2

d1 = new Date();

var increment = 1;
var currStart = 1;
var winner = 1;
for(var i = 1; i <= number; i++) {
  if(increment === 1 && winner >= currStart - 1) {
    increment = 2;
  }
  winner += increment;
  if (winner > i) {
    currStart = i;
    winner = 1;
    increment = 1;
  }
}

d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('Doing it mathematically, and killing across, the winner with ' + number + ' elves is elf ' + winner);
