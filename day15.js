var frosting = { cap:4, dur:-2, fla:0, tex:0, cal:5};
var candy = { cap:0, dur:5, fla:-1, tex:0, cal:8};
var butterscotch = { cap:-1, dur:0, fla:5, tex:0, cal:6};
var sugar = { cap:0, dur:0, fla:-2, tex:2, cal:1};

var testCookies = function(part2) {
    var best = 0;

    for(var f = 0; f < 100; f++){

        for(var c = 0; c < 100; c++){
            if(f+c > 100) { break; }
        
            for(var b = 0; b < 100; b++){
                if(f+c+b > 100) { break; }
            
                var s = 100 - (f + c + b);   
                var cals = frosting.cal*f + candy.cal*c + butterscotch.cal*b + sugar.cal*s;

                if(part2 && cals !== 500) { continue; }
            
                var cap = frosting.cap*f + candy.cap*c + butterscotch.cap*b + sugar.cap*s;
                var dur = frosting.dur*f + candy.dur*c + butterscotch.dur*b + sugar.dur*s;
                var fla = frosting.fla*f + candy.fla*c + butterscotch.fla*b + sugar.fla*s;
                var tex = frosting.tex*f + candy.tex*c + butterscotch.tex*b + sugar.tex*s;
            
                if(cap < 0) { cap = 0; }
                if(dur < 0) { dur = 0; }
                if(fla < 0) { fla = 0; }
                if(tex < 0) { tex = 0; }
            
                var total = cap*dur*fla*tex;
                if(total > best) { 
                    best = total;
                }
            }
        }
    }
    return best;
}
var score1 = testCookies();
console.log('The best cookies are ' + score1);
var score2 = testCookies(true);
console.log('The best 500-cal cookies are ' + score2);