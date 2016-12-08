var input = ['rect 1x1','rotate row y=0 by 6','rect 1x1','rotate row y=0 by 3','rect 1x1','rotate row y=0 by 5','rect 1x1','rotate row y=0 by 4','rect 2x1','rotate row y=0 by 5','rect 2x1','rotate row y=0 by 2','rect 1x1','rotate row y=0 by 5','rect 4x1','rotate row y=0 by 2','rect 1x1','rotate row y=0 by 3','rect 1x1','rotate row y=0 by 3','rect 1x1','rotate row y=0 by 2','rect 1x1','rotate row y=0 by 6','rect 4x1','rotate row y=0 by 4','rotate column x=0 by 1','rect 3x1','rotate row y=0 by 6','rotate column x=0 by 1','rect 4x1','rotate column x=10 by 1','rotate row y=2 by 16','rotate row y=0 by 8','rotate column x=5 by 1','rotate column x=0 by 1','rect 7x1','rotate column x=37 by 1','rotate column x=21 by 2','rotate column x=15 by 1','rotate column x=11 by 2','rotate row y=2 by 39','rotate row y=0 by 36','rotate column x=33 by 2','rotate column x=32 by 1','rotate column x=28 by 2','rotate column x=27 by 1','rotate column x=25 by 1','rotate column x=22 by 1','rotate column x=21 by 2','rotate column x=20 by 3','rotate column x=18 by 1','rotate column x=15 by 2','rotate column x=12 by 1','rotate column x=10 by 1','rotate column x=6 by 2','rotate column x=5 by 1','rotate column x=2 by 1','rotate column x=0 by 1','rect 35x1','rotate column x=45 by 1','rotate row y=1 by 28','rotate column x=38 by 2','rotate column x=33 by 1','rotate column x=28 by 1','rotate column x=23 by 1','rotate column x=18 by 1','rotate column x=13 by 2','rotate column x=8 by 1','rotate column x=3 by 1','rotate row y=3 by 2','rotate row y=2 by 2','rotate row y=1 by 5','rotate row y=0 by 1','rect 1x5','rotate column x=43 by 1','rotate column x=31 by 1','rotate row y=4 by 35','rotate row y=3 by 20','rotate row y=1 by 27','rotate row y=0 by 20','rotate column x=17 by 1','rotate column x=15 by 1','rotate column x=12 by 1','rotate column x=11 by 2','rotate column x=10 by 1','rotate column x=8 by 1','rotate column x=7 by 1','rotate column x=5 by 1','rotate column x=3 by 2','rotate column x=2 by 1','rotate column x=0 by 1','rect 19x1','rotate column x=20 by 3','rotate column x=14 by 1','rotate column x=9 by 1','rotate row y=4 by 15','rotate row y=3 by 13','rotate row y=2 by 15','rotate row y=1 by 18','rotate row y=0 by 15','rotate column x=13 by 1','rotate column x=12 by 1','rotate column x=11 by 3','rotate column x=10 by 1','rotate column x=8 by 1','rotate column x=7 by 1','rotate column x=6 by 1','rotate column x=5 by 1','rotate column x=3 by 2','rotate column x=2 by 1','rotate column x=1 by 1','rotate column x=0 by 1','rect 14x1','rotate row y=3 by 47','rotate column x=19 by 3','rotate column x=9 by 3','rotate column x=4 by 3','rotate row y=5 by 5','rotate row y=4 by 5','rotate row y=3 by 8','rotate row y=1 by 5','rotate column x=3 by 2','rotate column x=2 by 3','rotate column x=1 by 2','rotate column x=0 by 2','rect 4x2','rotate column x=35 by 5','rotate column x=20 by 3','rotate column x=10 by 5','rotate column x=3 by 2','rotate row y=5 by 20','rotate row y=3 by 30','rotate row y=2 by 45','rotate row y=1 by 30','rotate column x=48 by 5','rotate column x=47 by 5','rotate column x=46 by 3','rotate column x=45 by 4','rotate column x=43 by 5','rotate column x=42 by 5','rotate column x=41 by 5','rotate column x=38 by 1','rotate column x=37 by 5','rotate column x=36 by 5','rotate column x=35 by 1','rotate column x=33 by 1','rotate column x=32 by 5','rotate column x=31 by 5','rotate column x=28 by 5','rotate column x=27 by 5','rotate column x=26 by 5','rotate column x=17 by 5','rotate column x=16 by 5','rotate column x=15 by 4','rotate column x=13 by 1','rotate column x=12 by 5','rotate column x=11 by 5','rotate column x=10 by 1','rotate column x=8 by 1','rotate column x=2 by 5','rotate column x=1 by 5'];

var rectRe = /rect (\d+)x(\d+)/;
var rowRe = /rotate row y=(\d+) by (\d+)/;
var colRe = /rotate column x=(\d+) by (\d+)/;

var grid = [[],[],[],[],[],[]];

var rect = function(y,x) {
  for(var i = 0; i < x; i++) {
    for(var j = 0; j < y; j++) {
      grid[i][j] = true;
    }
  }
}

var rotateRow = function(row,amt) {
  var newRow = [];
  for(var i = 0; i < grid[row].length; i++) {
    newI = (i + amt) % 50;
    newRow[newI] = grid[row][i]; 
  }
  grid[row] = newRow;
}

var rotateCol = function(col,amt) {
  var newCol = [];
  for(var i = 0; i < 6; i++) {
    newI = (i + amt) % 6;
    newCol[newI] = grid[i][col];
  }
  for(var i = 0; i < 6; i++) {
    grid[i][col] = newCol[i];
  }
}

for(var i = 0; i < input.length; i++) {
  var inst = input[i];
  var match;
  if(match = rectRe.exec(inst)) {
    rect(Number(match[1]),Number(match[2]));
  } else if(match = rowRe.exec(inst)) {
    rotateRow(Number(match[1]),Number(match[2]));
  } else if(match = colRe.exec(inst)) {
    rotateCol(Number(match[1]),Number(match[2]));
  }
}

var count = 0;
for(var i = 0; i < 6; i++) {
  var row = '';
  for(var j = 0; j < grid[i].length; j++) {
    if(grid[i][j]) {
      count++;
      row = row + 'O';
    } else {
      row = row + ' ';
    }
  }
  console.log(row);
}
console.log(count + ' pixels are lit.');
