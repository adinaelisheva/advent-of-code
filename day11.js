var map = { 'a':'b','b':'c','c':'d','d':'e','e':'f','f':'g','g':'h','h':'i','i':'j','j':'k','k':'l','l':'m','m':'n','n':'o','o':'p','p':'q','q':'r','r':'s','s':'t','t':'u','u':'v','v':'w','w':'x','x':'y','y':'z','z':'a' };
var input = 'vzbxkghb';

var increment = function(str) {
    for(var i = str.length-1; i >= 0; i--) {
        var c = map[str[i]];
        str = str.substring(0,i) + c + str.substring(i+1);
        if(str[i] !== 'a') { return str; }
    }
    return str;
}

var check = function(str) {
    var prevPair = '';
    var foundInc = false;
    var foundPairs = false;
    var l = str.length; //for concision
    for(var i = 0; i < l; i++){
        var c = str[i];
        if(c === 'i' || c === 'l' || c === 'o') { return false; }
        if(!foundInc && i < (l-2) && map[c] === str[i+1] && map[map[c]] === str[i+2] && str[i+1] !== 'a' && str[i+2] !== 'a') {
            foundInc = true;
        }
        if(!foundPairs && i < l-1 && c === str[i+1]) {
            if(prevPair) {
                foundPairs = (prevPair !== c);
            } else {
                prevPair = c;
            }
        }
    }
    return(foundPairs && foundInc);
}

while(!check(input)) { input = increment(input); }

console.log('New password: ' + input);

input = increment(input);

while(!check(input)) { input = increment(input); }

console.log('Newer password: ' + input);
