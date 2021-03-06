//these pairs are [total positions,starting position]
var discs1 = [[13,1],[19,10],[3,2],[7,1],[5,3],[17,5]];
var discs2 = [[13,1],[19,10],[3,2],[7,1],[5,3],[17,5],[11,0]];

var run = function(discs) {
  var paths = [];

  for(var t = 1; true; t++) {
    for(var d = 1; d <= discs.length; d++) {
      //doing a weird 1-index thing cause the discs' positions start at 1
      var disc = discs[d-1];
      disc[1] = (disc[1] + 1) % disc[0]; //rotate the disc

      var start = t-d; //the starting time for the capsule to reach this disc at this time
      if(start < 0) {
        continue; //disc is unreachable
      }
      
      if (disc[1] !== 0) {
        //this path is blocked
        paths[start] = false;
      } else if(paths[start] !== false) {
        //the slot has lined up and an existing path is here
        paths[start] = true; //not strictly necessary but makes me happy
        if(d === discs.length) {
          //all discs have been passed - this is a valid start time!
          return 'start at time ' + start;
        }
      }
    }
  }
}
var d1 = new Date();
var ret = run(discs1);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);

d1 = new Date();
ret = run(discs2);
d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);