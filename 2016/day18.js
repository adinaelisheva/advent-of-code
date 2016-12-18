var startRow = '^.^^^..^^...^.^..^^^^^.....^...^^^..^^^^.^^.^^^^^^^^.^^.^^^^...^^...^^^^.^.^..^^..^..^.^^.^.^.......'.split('');

var run = function(totalRows) {

  var totalSafe = startRow.reduce(function(total,curr) { return curr === '.' ? total+1 : total;}, 0);
  var prevRow = startRow;

  for(var i = 0; i < (totalRows-1); i++) {
    var newRow = [];
    for(var j = 0; j < prevRow.length; j++) {
      var L = j > 0 ? prevRow[j-1] : '.';
      var C = prevRow[j];
      var R = j < (prevRow.length-1) ? prevRow[j+1] : '.';
      if( (L === '^' && C === '^' && R === '.') || 
          (L === '.' && C === '^' && R === '^') || 
          (L === '^' && C === '.' && R === '.') || 
          (L === '.' && C === '.' && R === '^') ) {
            newRow.push('^');
      } else {
        newRow.push('.');
      }
    }
    totalSafe += newRow.reduce(function(total,curr) { return curr === '.' ? total+1 : total;}, 0);
    prevRow = newRow;
  }

  return totalSafe;
}

console.log('A small room has ' + run(40) + ' safe spots');
console.log('A large room has ' + run(400000) + ' safe spots');
