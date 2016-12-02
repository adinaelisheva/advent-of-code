var regs = {
    a : 0,
    b : 0
};
var program = [['jio','a',16],['inc','a'],['inc','a'],['tpl','a'],['tpl','a'],['tpl','a'],['inc','a'],['inc','a'],['tpl','a'],['inc','a'],['inc','a'],['tpl','a'],['tpl','a'],['tpl','a'],['inc','a'],['jmp',23],['tpl','a'],['inc','a'],['inc','a'],['tpl','a'],['inc','a'],['inc','a'],['tpl','a'],['tpl','a'],['inc','a'],['inc','a'],['tpl','a'],['inc','a'],['tpl','a'],['inc','a'],['tpl','a'],['inc','a'],['inc','a'],['tpl','a'],['inc','a'],['tpl','a'],['tpl','a'],['inc','a'],['jio','a',8],['inc','b'],['jie','a',4],['tpl','a'],['inc','a'],['jmp',2],['hlf','a'],['jmp',-7]];

var run = function() {
    var i = 0;
    while(i < program.length) {
        var inst = program[i];
        if(inst[0]==='hlf'){
            var r = inst[1];
            regs[r] = ~~(regs[r]/2);
            i++;
        } else if(inst[0]==='tpl'){
            var r = inst[1];
            regs[r]*=3;
            i++;
        } else if(inst[0]==='inc'){
            var r = inst[1];
            regs[r]+=1;
            i++;
        } else if(inst[0]==='jmp'){
            i += inst[1];
        } else if(inst[0]==='jie'){
            var r = inst[1];
            if(regs[r] % 2 === 0) { 
                i += inst[2]; 
            } else {
                i++;
            }
        } else if(inst[0]==='jio'){
            var r = inst[1];
            if(regs[r] === 1) { 
                i += inst[2]; 
            } else {
                i++;
            }
        } else {
            break;
        }
    }
}
run();
console.log('Program result is { a:' + regs.a + ', b:'+regs.b+' }');
regs = {
    a : 1,
    b : 0
};
run();
console.log('Program result the second time is { a:' + regs.a + ', b:'+regs.b+' }');