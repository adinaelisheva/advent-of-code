var part1Building = {steps:0,el:1,1: ['SG','SM','PG','PM'], 2: ['TG','RG','RM','CG','CM'], 3: ['TM'], 4: []};
var part2Building = {steps:0,el:1,1: ['SG','SM','PG','PM','EG','EM','DG','DM'], 2: ['TG','RG','RM','CG','CM'], 3: ['TM'], 4: []};
var seens;

//get a copy of the building minus the elevator's floor
var getSubCopy = function(building){
  var ret = {};
  for(var i = 1; i < 5; i++){
    if(building.el === i) { continue; }
    ret[i] = []
    for(var j = 0; j < building[i].length; j++) {
      ret[i][j] = building[i][j];
    }
  }
  return ret;
}

var takeItemsFromFloor = function(floor,items){
  var ret = [];
  for(var i = 0; i < floor.length; i++){
    if(items.indexOf(floor[i]) > -1) { continue; }
    ret.push(floor[i]);
  }
  return ret;
}

isValidFloor = function(floor){
  var unprotectedChips = 0;
  var RTGs = 0;
  for(var i = 0; i < floor.length; i++){
    if(floor[i][1] === 'G'){
      RTGs++;
    }
    if(floor[i][1] === 'M' && floor.indexOf(floor[i][0] + 'G') < 0){
      unprotectedChips++;
    }
  }
  if(RTGs > 0 && unprotectedChips > 0){
    return false;
  }
  return true;
}

var isValidBuilding = function(building) {
  for(var i = 1; i < 5; i++){
    if (!isValidFloor(building[i])) {
      return false;
    }
  }
  return true;

}

var getBuildingString = function(building) {
  var map = {};
  var letters = 'ABCDEFGHIJ';
  var letInd = 0;
  var ret = '';
  ret += building.el;
  for(var i = 1; i < 5; i++){
    ret += i;
    var floorItems = [];
    for(var j = 0; j < building[i].length; j++) {
      var item = building[i][j];
      if(map[item[0]] === undefined) {
        map[item[0]] = letters[letInd];
        letInd++;
      }
      floorItems.push((map[item[0]] + item[1]));
    }
    ret = ret + floorItems.sort().join('');
  }
  return ret;
}

var createAllNextBuildings = function(building) {
  var ret = [];

  //elevator can go to next or previous floor, unless it's already on floor 1 or 4
  var floorOptions = building.el === 1 ? [2] : building.el === 4 ? [3] : [building.el+1,building.el-1];

  for(var i = 0; i < floorOptions.length; i++){
    var floorInd = floorOptions[i];
    var itemOptions = building[building.el];
    for(var j = -1; j < itemOptions.length; j++) {
      for(var k = j+1; k < itemOptions.length; k++) {
        if(j === k) { continue; }

        var testBuilding = getSubCopy(building);
        testBuilding.el = floorInd;
        testBuilding.steps = building.steps+1;
        var movedItems = [];

        //-1 means skip an item - only bring 1
        if(j !== -1) { movedItems.push(itemOptions[j]); }
        movedItems.push(itemOptions[k]);
        testBuilding[building.el] = takeItemsFromFloor(building[building.el],movedItems);
        testBuilding[floorInd] = testBuilding[floorInd].concat(movedItems);
        if(isValidBuilding(testBuilding)) {
          var str = getBuildingString(testBuilding);
          if(!seens[str]){
            ret.push(testBuilding);
            seens[str] = true;
          }
        }
      }
    }
  }
  return ret; 
}

var ret;
var run = function(queue,totalItems) {
  seens = {};
  while(queue.length > 0) {
    var building = queue.shift();
    if(building[4].length === totalItems) {
      ret = 'Succeeded in ' + building.steps + ' steps';
      break;
    }
    queue = queue.concat(createAllNextBuildings(building));
  }
}
var d1 = new Date();
run([part1Building],10);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);

d1 = new Date();
run([part2Building],14);
var d2 = new Date();
console.log('\n'+(d2.getTime() - d1.getTime())/1000 + 's');
console.log(ret);


