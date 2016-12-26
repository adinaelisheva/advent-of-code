var run = function(str,len) {
  while(str.length < len) {
    var str2 = '';
    for(var i = str.length-1; i >= 0; i--) {
      str2 += ((str[i] === '1') ? '0' : '1');
    }
    str = str + '0' + str2;
  }

  str = str.substr(0,len);

  var checksum;
  var oldsum = str;
  do {
    checksum = '';
    for(var i = 0; i < oldsum.length; i+=2) {
      var pair = oldsum.substr(i,2);
      if(pair[0] === pair[1]) {
        checksum += 1;
      } else {
        checksum += 0;
      }
    }
    oldsum = checksum;
  } while (checksum.length % 2 === 0);
  return checksum;
}

var d1 = new Date();
var ret = run('10010000000110000',272);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);

d1 = new Date();
ret = run('10010000000110000',35651584);
d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);