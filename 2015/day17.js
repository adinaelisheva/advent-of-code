var inputs = [50,44,11,49,42,46,18,32,26,40,21,7,18,43,10,47,36,24,22,40];

var total = 150;
var combos = 0;
var amts = [];

var tryCombo = function(ind,curAmt,containers) {
    if(amts[containers] === undefined) { amts[containers] = 0; }
    if(curAmt === total) {
        combos++;
        amts[containers]++;
    }
    
    for(var i = ind; i < inputs.length; i++) {
        tryCombo(i+1,curAmt+inputs[i],containers+1);
    }
}
        
tryCombo(0,0,0);

console.log('There are ' + combos + ' combos');

for(var i = 0; i < amts.length && amts[i] === 0; i++);
console.log('There are ' + amts[i] + ' ways to reach 150 with ' + i + ' containers');
    