var boss = {hp: 58, damage: 9};
var player = {hp: 50, mp: 500};
var minMana = Infinity;
var hard = false;

var castSpell = function(bossHP, playerHP, playerMP, shield, poison, recharge, totalMana){
    if(totalMana > minMana) { return; }
    //check if the boss died
    if(bossHP <= 0) {
        if(totalMana < minMana) { minMana = totalMana; }
        return;
    }
        
    //boss turn
    var armor = 0;
    if(shield) {
        shield--;
        armor = 7; 
    }
    if(poison) {
        poison--;
        bossHP -= 3;
    }
    if(recharge) {
        recharge--;
        playerMP += 101;
    }
    
    if(bossHP <= 0) {
        if(totalMana < minMana) { minMana = totalMana; }
        return;
    }
    playerHP -= Math.max(boss.damage - armor,1)
    if(hard) { playerHP -= 1; }
    if(playerHP <= 0) { return; }
    
    //player turn
    if(poison) {
        poison--;
        bossHP -= 3;
    }
    if(recharge) {
        recharge--;
        playerMP += 101;
    }
    if(shield) { shield--; }
    
    //try magic missile
    if(playerMP >= 53) {
       castSpell(bossHP-4,playerHP,playerMP-53,shield,poison,recharge,totalMana+53);
    }
    //try drain
    if(playerMP >= 73) {
       castSpell(bossHP-2,playerHP+2,playerMP-73,shield,poison,recharge,totalMana+73);
    }
    //try shield
    if(playerMP >= 113 && !shield) {
       castSpell(bossHP,playerHP,playerMP-113,6,poison,recharge,totalMana+113);
    }
    //try poison
    if(playerMP >= 173 && !poison) {
       castSpell(bossHP,playerHP,playerMP-173,shield,6,recharge,totalMana+173);
    }
    //try recharge
    if(playerMP >= 229 && !recharge) {
       castSpell(bossHP,playerHP,playerMP-229,shield,poison,5,totalMana+229);
    }
    
}

var castEverySpell = function() {
    //magic missile
    castSpell(boss.hp-4,player.hp,player.mp-53,0,0,0,53);
    //drain
    castSpell(boss.hp-2,player.hp+2,player.mp-73,0,0,0,73);
    //shield
    castSpell(boss.hp,player.hp,player.mp-113,6,0,0,113);
    //poison
    castSpell(boss.hp,player.hp,player.mp-173,0,6,0,173);
    //recharge
    castSpell(boss.hp,player.hp,player.mp-229,0,0,5,229);
}

//try each spell, easy mode
castEverySpell();
console.log('The least mana you can spend on easy mode is ' + minMana);

//try each spell, hard mode
minMana = Infinity;
hard = true;
castEverySpell();
console.log('The least mana you can spend on hard mode is ' + minMana);
