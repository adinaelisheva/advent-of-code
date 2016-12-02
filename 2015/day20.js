var number = 34000000;

var countPresents = function(part2) {
    var inc = part2 ? 11 : 10;
    for(var i = 0; i < number; i++) {
        var root = Math.sqrt(i);
        var sum = 0;
        for(var house = 0; house < root; house++) {
            if((i%house) === 0) {
                var other = i/house;
                if((!part2) || (other <= 50)) {
                    sum += house*inc;
                }
                if((!part2) || (house <= 50)) {
                    sum += other*inc;
                }
            }
        }
        if(sum >= number) {
            return i;
        }
    }
}

var num1 = countPresents(false);
console.log('First house with ' + number + ' presents, method 1, is #' + num1);
var num2 = countPresents(true);
console.log('First house with ' + number + ' presents, method 2, is #' + num2);