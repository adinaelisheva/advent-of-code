var input = ['rotate right 3 steps','swap letter b with letter a','move position 3 to position 4','swap position 0 with position 7','swap letter f with letter h','rotate based on position of letter f','rotate based on position of letter b','swap position 3 with position 0','swap position 6 with position 1','move position 4 to position 0','rotate based on position of letter d','swap letter d with letter h','reverse positions 5 through 6','rotate based on position of letter h','reverse positions 4 through 5','move position 3 to position 6','rotate based on position of letter e','rotate based on position of letter c','rotate right 2 steps','reverse positions 5 through 6','rotate right 3 steps','rotate based on position of letter b','rotate right 5 steps','swap position 5 with position 6','move position 6 to position 4','rotate left 0 steps','swap position 3 with position 5','move position 4 to position 7','reverse positions 0 through 7','rotate left 4 steps','rotate based on position of letter d','rotate left 3 steps','swap position 0 with position 7','rotate based on position of letter e','swap letter e with letter a','rotate based on position of letter c','swap position 3 with position 2','rotate based on position of letter d','reverse positions 2 through 4','rotate based on position of letter g','move position 3 to position 0','move position 3 to position 5','swap letter b with letter d','reverse positions 1 through 5','reverse positions 0 through 1','rotate based on position of letter a','reverse positions 2 through 5','swap position 1 with position 6','swap letter f with letter e','swap position 5 with position 1','rotate based on position of letter a','move position 1 to position 6','swap letter e with letter d','reverse positions 4 through 7','swap position 7 with position 5','swap letter c with letter g','swap letter e with letter g','rotate left 4 steps','swap letter c with letter a','rotate left 0 steps','swap position 0 with position 1','reverse positions 1 through 4','rotate based on position of letter d','swap position 4 with position 2','rotate right 0 steps','swap position 1 with position 0','swap letter c with letter a','swap position 7 with position 3','swap letter a with letter f','reverse positions 3 through 7','rotate right 1 step','swap letter h with letter c','move position 1 to position 3','swap position 4 with position 2','rotate based on position of letter b','reverse positions 5 through 6','move position 5 to position 3','swap letter b with letter g','rotate right 6 steps','reverse positions 6 through 7','swap position 2 with position 5','rotate based on position of letter e','swap position 1 with position 7','swap position 1 with position 5','reverse positions 2 through 7','reverse positions 5 through 7','rotate left 3 steps','rotate based on position of letter b','rotate left 3 steps','swap letter e with letter c','rotate based on position of letter a','swap letter f with letter a','swap position 0 with position 6','swap position 4 with position 7','reverse positions 0 through 5','reverse positions 3 through 5','swap letter d with letter e','move position 0 to position 7','move position 1 to position 3','reverse positions 4 through 7'];
//input = ['swap position 4 with position 0','swap letter d with letter b','reverse positions 0 through 4','rotate left 1 step','move position 1 to position 4','move position 3 to position 0','rotate based on position of letter b','rotate based on position of letter d'];

var swapPos = /swap position (\d+) with position (\d+)/;
var swapLet = /swap letter (.) with letter (.)/;
var rotate = /rotate (left|right) (\d+) steps?/;
var rotatePos = /rotate based on position of letter (.)/;
var reverse = /reverse positions (\d+) through (\d+)/;
var move = /move position (\d+) to position (\d+)/;
var m;

var rotateStr = function(str,direction,amount,part1) {
  var sign = direction === 'right' ? 1 : -1;
  if(!part1) { sign *= -1; } //part 2 is backwards
  var newStr = [];
  for(var j = 0; j < str.length; j++) {
    var newInd = (j + (sign * amount)) % str.length;
    if (newInd < 0) { newInd += str.length; }
    newStr[newInd] = str[j];
  }
  return newStr.join('');
}

var run = function(str,part1,input) {
  for(var i = 0; i < input.length; i++) {
    if(m = swapPos.exec(input[i])) {
      var m1 = Number(m[1]);
      var m2 = Number(m[2]);
      var p1 = Math.min(m1,m2);
      var p2 = Math.max(m1,m2);
      var c1 = str[p1];
      var c2 = str[p2];
      str = str.substring(0,p1) + c2 + str.substring(p1+1,p2) + c1 + str.substring(p2+1);
    } else if(m = swapLet.exec(input[i])) {
      var c1 = m[1];
      var c2 = m[2];
      str = str.replace(c1,'_');
      str = str.replace(c2,c1);
      str = str.replace('_',c2);
    } else if(m = rotate.exec(input[i])) {
      str = rotateStr(str,m[1],Number(m[2]),part1);
    } else if(m = rotatePos.exec(input[i])) {
      var step = function(str) {
        var pos = str.indexOf(m[1]);
        if(pos >= 4) { pos++ };
        return rotateStr(str,'right',pos+1,true);
      }
      if(part1) {
        str = step(str);
      } else {
        //part 2 is annoying and backwards
        var test;
        var amt = 2; //has to be at least 2
        do {
          test = rotateStr(str,'left',amt,part1);
          amt++; 
        } while (str !== step(test)) //check if this would be right if you did it for reals
        str = test;
      }
    } else if(m = reverse.exec(input[i])) {
      var m1 = Number(m[1]);
      var m2 = Number(m[2]);
      var n1 = Math.min(m1,m2);
      var n2 = Math.max(m1,m2) + 1;//add one so it's inclusive on this end too
      str = str.substring(0,n1) + str.substring(n1,n2).split('').reverse().join('') + str.substring(n2);
    } else if(m = move.exec(input[i])) {
      if (part1) {
        var p1 = Number(m[1]);
        var p2 = Number(m[2]);
      } else {
        //part 2 is backwards
        var p2 = Number(m[1]); //p1 is the char being moved
        var p1 = Number(m[2]); //p2 is where it's being moved to
      }
      var c = str[p1];
      if(p1 < p2) {
        //the +2 is to account for the letter that's missing
        str = str.substring(0,p1) + str.substring(p1+1,p2+1) + c + str.substring(p2+1);
      } else {
        str = str.substring(0,p2) + c + str.substring(p2,p1) + str.substring(p1+1);
      }
    }
  }
  return str;
}

var d1 = new Date();
var ret = run('abcdefgh',true,input);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('my fake password is ' + ret);

d1 = new Date();
ret = run('fbgdceah',false,input.reverse());
d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log('the real password is ' + ret);

