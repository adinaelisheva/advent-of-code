var player = {hp:100, damage:0, armor:0};
var boss = {hp:109, damage:8, armor:2};
var weapons = [{name:'Dagger',cost:8,damage:4,armor:0},{name:'Shortsword',cost:10,damage:5,armor:0},{name:'Warhammer',cost:25,damage:6,armor:0},{name:'Longsword',cost:40,damage:7,armor:0},{name:'Greataxe',cost:74,damage:8,armor:0}];
var armors = [{name:'None',cost:0,damage:0,armor:0},{name:'Leather',cost:13,damage:0,armor:1},{name:'Chainmail',cost:31,damage:0,armor:2},{name:'Splintmail',cost:53,damage:0,armor:3},{name:'Bandedmail',cost:75,damage:0,armor:4},{name:'Platemail',cost:102,damage:0,armor:5}];
var rings = [{name:'None',cost:0,damage:0,armor:0},{name:'None',cost:0,damage:0,armor:0},{name:'Damage1',cost:25,damage:1,armor:0},{name:'Damage2',cost:50,damage:2,armor:0},{name:'Damage3',cost:100,damage:3,armor:0},{name:'Defense1',cost:20,damage:0,armor:1},{name:'Defense2',cost:40,damage:0,armor:2},{name:'Defense3',cost:80,damage:0,armor:3}];

var attack = function(attacker, attackee) {
    return Math.max(attacker.damage - attackee.armor, 1);
}

var simulateBattle = function(player,boss) {
    var pHP = player.hp;
    var bHP = boss.hp
    while(pHP > 0 && bHP > 0) {
        bHP -= attack(player,boss);
        pHP -= attack(boss,player);
    }
    return bHP <= 0;
}

var applyItems = function(p,stuff,pos){
    var factor = pos ? 1 : -1;
    for(var i = 0; i < stuff.length; i++) {    
        p.damage += stuff[i].damage*factor;
        p.armor += stuff[i].armor*factor;
    }
}

var minCost = Infinity;
var maxCost = 0;

for(var w = 0; w < weapons.length; w++) {
    var weap = weapons[w];
    for(var a = 0; a < armors.length; a++) {
        var arm = armors[a];
        for(var r1 = 0; r1 < rings.length; r1++) {
            var ring1 = rings[r1];
            for(var r2 = r1+1; r2 < rings.length; r2++) {
                var ring2 = rings[r2];
                applyItems(player,[weap,arm,ring1,ring2],true);
                var cost = weap.cost+arm.cost+ring1.cost+ring2.cost;
                console.log(weap.name+' '+arm.name+' '+ring1.name+' '+ring2.name+' = '+cost)
                if(simulateBattle(player,boss)){
                    console.log('won');
                    if(cost < minCost) { minCost = cost; }
                } else {
                    console.log('lost');
                    if(cost > maxCost) { maxCost = cost;}
                }
                applyItems(player,[weap,arm,ring1,ring2],false);
            }
        }
    }
}

console.log('You can win with spending only '+minCost+' gold!');
console.log('However, you can lose even if you spend '+maxCost+' gold.');
            


