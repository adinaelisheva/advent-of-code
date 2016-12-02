var input = [1,2,3,7,11,13,17,19,23,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113];

var sumList = function(list) {
    var sum = 0;
    for(var i = 0; i < list.length; i++){ sum+=list[i]; }
    return sum;
}

var goal = sumList(input)/3;
var groups = [];
var minLen = Infinity;
var minEnt = Infinity;

//helper fn to return a list of all input items not in the provided list
var complement = function(list) {
    return input.filter(function(x) { return list.indexOf(x) === -1; });
}

//cache g1s that we've tried already
var tried = {};

var generate = function(cur,list,ind,g1){
    if(tried[cur] || tried[g1]) { return; }
    var curSum = sumList(cur);
    if(curSum > goal) { return; }
    if(!g1 && cur.length > minLen) { return; }
    
    if(curSum === goal) {
        if(g1) {
            //we have found all 3! rest is guaranteed to sum to goal here
            //for 4 groups.... this still works? somehow.
            var sofar = cur.concat(g1);
            var rest = complement(sofar);
            if(g1.length < minLen) { 
                minLen = g1.length;
                minEnt = Infinity; //reset this
                groups = [];
            }
            var g1c = g1.slice();
            //we have to check entanglement
            var ent = g1.reduce(function(c,p) { return c*p; });
            if(ent <= minEnt) {
                minEnt = ent; 
            } else { 
                tried[g1c] = true;
                return;
            }
            tried[g1c] = true;
            groups.push(g1c);
        } else {
            var rest = complement(cur);
            generate([],rest,0,cur);
        }
        return;
    }
    for(var i = ind; i < list.length; i++) {
        //run through every combo 
        cur.push(list[i]);
        generate(cur,list,i+1,g1);
        cur.pop(list[i]);
    }
}

generate([],input,0);

console.log('With 3 groups, the min entanglement is ' + minEnt);

goal = sumList(input)/4; //i feel like this shouldn't work... but it does. shrug!
groups = [];
minLen = Infinity;
minEnt = Infinity;

generate([],input,0);

console.log('With 4 groups, the min entanglement is ' + minEnt);





