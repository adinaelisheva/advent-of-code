var seen = {};
var lessThanFifty = {};

var goal = [31,39];

var isSpotOpen = function(x,y) {
  if(x < 0 || y < 0) { return false; } 
  if(seen[x+'|'+y]) { return false; }

  var calc = x*x + 3*x + 2*x*y + y + y*y + 1352;
  var binary = calc.toString(2);
  var sum = 0;
  for(var i = 0; i < binary.length; i++){ sum += Number(binary[i]); }
  return (sum % 2) === 0;
}

var printGrid = function(maxX,maxY) {
  var str = '  ';
  for(var i = 0; i < maxX; i++) {
    str += i % 10; //keep it single digit
  }
  console.log(str);
  //rows = Y, columns = X
  for(var i = 0; i < maxY; i++) {
    str = (i % 10) + ' ';
    for(var j = 0; j < maxX; j++) {
      if(isSpotOpen(j,i)) {
        str += '.';
      } else {
        str += '#';
      }
    }
    console.log(str);
  }
}

//these objects are xPos, yPos, steps
var queue = [[1,1,0]];

while(queue.length > 0) {
  var pos = queue.shift();
  seen[pos[0] + '|' + pos[1]] = true; //just to be safe

  if(pos[2] < 51) {
    lessThanFifty[pos[0] + '|' + pos[1]] = true;
  }

  if(pos[0] === goal[0] && pos[1] === goal[1]) {
    console.log('Shortest path to goal is ' + pos[2]);
    console.log('Unique positions reached in under 50 steps: ' + Object.keys(lessThanFifty).length );
    break;
  }
  var options = [ [pos[0] - 1, pos[1]], [pos[0] + 1, pos[1]], [pos[0], pos[1] - 1], [pos[0], pos[1] + 1] ];
  for(var i = 0; i < options.length; i++) {
    var o = options[i];
    if(isSpotOpen(o[0],o[1])) {
      queue.push([o[0],o[1],pos[2]+1]);
      seen[o[0]+'|'+o[1]] = true;
    }
  }
}