var input = {'AB':54,'AC':-81,'AD':-42,'AE':89,'AF':-89,'AG':97,'AM':-94,'BA':3,'BC':-70,'BD':-31,'BE':72,'BF':-25,'BG':-95,'BM':11,'CA':-83,'CB':8,'CD':35,'CE':10,'CF':61,'CG':10,'CM':29,'DA':67,'DB':25,'DC':48,'DE':-65,'DF':8,'DG':84,'DM':9,'EA':-51,'EB':-39,'EC':84,'ED':-98,'EF':-20,'EG':-6,'EM':60,'FA':51,'FB':79,'FC':88,'FD':33,'FE':43,'FG':77,'FM':-3,'GA':-14,'GB':-12,'GC':-52,'GD':14,'GE':-62,'GF':-18,'GM':-17,'MA':-36,'MB':76,'MC':-34,'MD':37,'ME':40,'MF':18,'MG':7};
var people = ['A','B','C','D','E','F','G','M'];

var bestScore = 0;

var test = function(table) {

    if(table.length === people.length) {
    
        var score = 0;
        for(var i = 0; i < table.length; i++) {
            var j = (i + 1) % table.length;
            var combo1 = table[i] + table[j];
            var combo2 = table[j] + table[i];
            score += input[combo1];
            score += input[combo2];
        }
        if(score > bestScore) { bestScore = score; }
        
    } else {
        
        for(var i = 0; i < people.length; i++) {
            if(table.indexOf(people[i]) > -1) { continue; }
            table.push(people[i]);
            test(table);
            table.pop();
        }
    }
}

test([]);

console.log('Best score is ' + bestScore);

//now add myself as X with 0 score with everyone

for(var i = 0; i < people.length; i++) {
    var combo1 = 'X' + people[i];
    var combo2 = people[i] + 'X';
    input[combo1] = 0;
    input[combo2] = 0;
}
people.push('X');

//reset and try again
bestScore = 0;
test([]);
console.log('Best score including me is ' + bestScore);

