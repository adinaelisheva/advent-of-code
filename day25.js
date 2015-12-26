var input = [2947,3029];

var getNumberAt = function(row,col) {
    for(var i = 0, val = 1; i < col; i++) {
        val += i;
    }
    for(var i = 0,inc = col-1; i < row; i++,inc++) {
        val += inc;
    }
    return val;
}

var iterate = function(num) {
    num *= 252533;
    return num % 33554393; 
}

var codeNum = getNumberAt(input[0],input[1]);

for(var i = 2,val=20151125; i <= codeNum; i++) {
    val = iterate(val);
}

console.log('The code is ' + val);