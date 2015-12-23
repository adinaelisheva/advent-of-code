var input = '1113122113';

for(var i = 0; i < 50; i++) {
    var j = 0;
    var output = '';
    while(j < input.length){
        var curChar = input[j];
        for(var count = 0; j < input.length && input[j] === curChar; j++, count++);
        output = output + count + curChar;
    }
    input = output;
}

console.log('the result has ' + output.length + ' chars');