var input = [{name:'Rudolph',speed:22,runtime:8,resttime:165},{name:'Cupid',speed:8,runtime:17,resttime:114},{name:'Prancer',speed:18,runtime:6,resttime:103},{name:'Donner',speed:25,runtime:6,resttime:145},{name:'Dasher',speed:11,runtime:12,resttime:125},{name:'Comet',speed:21,runtime:6,resttime:121},{name:'Blitzen',speed:18,runtime:3,resttime:50},{name:'Vixen',speed:20,runtime:4,resttime:75},{name:'Dancer',speed:7,runtime:20,resttime:119}];

//make all the objects we need
var names = [];
var speeds = {}
var runtimes = {}
var resttimes = {}
var resting = {}
var running = {}
var dists = {}

for(var i = 0; i < input.length; i++) {
    var name = input[i].name;
    names.push(name);
    speeds[name] = input[i].speed;
    runtimes[name] = input[i].runtime;
    resttimes[name] = input[i].resttime;
    running[name] = runtimes[name];
    resting[name] = 0;
    dists[name] = 0;
}

var updateReindeerDists = function(){
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        if(running[name]) {
            running[name]--;
            dists[name]+=speeds[name];
            if(running[name] === 0) {
                resting[name] = resttimes[name];
            }
        } else if(resting[name]) {
            resting[name]--;
            if(resting[name] === 0) {
                running[name] = runtimes[name];
            }
        }
    }
}

//run for awhile
for(var s = 0; s < 2503; s++) {
    updateReindeerDists();
}

//who won?
var findWinner = function(array) {
    var max = 0;
    var winner;
    for(var i = 0; i < names.length; i++) {
        var name = names[i];
        if(array[name] > max) {
            winner = name;
            max = array[name];
        }
    }
    return [winner,max];
}

var arr = findWinner(dists);
console.log(arr[0] + ' wins with a distance of ' + arr[1]);

//part 2

//reset and set up new points map
var points = {}
for(var i = 0; i < input.length; i++) {
    var name = input[i].name;
    running[name] = runtimes[name];
    resting[name] = 0;
    dists[name] = 0;
    points[name] = 0;
}

//run for awhile
for(var s = 0; s < 2503; s++) {
    updateReindeerDists();
    var arr = findWinner(dists);
    var winner = arr[0];
    points[winner]++;
}

var arr = findWinner(points);
console.log(arr[0] + ' wins with ' + arr[1] + ' points');




