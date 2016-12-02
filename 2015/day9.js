var dists = {'ACSD':66,'SDAC':66,'ACTB':28,'TBAC':28,'ACFR':60,'FRAC':60,'ACNR':34,'NRAC':34,'ACSL':34,'SLAC':34,'ACTR':3,'TRAC':3,'ACAR':108,'ARAC':108,'SDTB':22,'TBSD':22,'SDFR':12,'FRSD':12,'SDNR':91,'NRSD':91,'SDSL':121,'SLSD':121,'SDTR':111,'TRSD':111,'SDAR':71,'ARSD':71,'TBFR':39,'FRTB':39,'TBNR':113,'NRTB':113,'TBSL':130,'SLTB':130,'TBTR':35,'TRTB':35,'TBAR':40,'ARTB':40,'FRNR':63,'NRFR':63,'FRSL':21,'SLFR':21,'FRTR':57,'TRFR':57,'FRAR':83,'ARFR':83,'NRSL':9,'SLNR':9,'NRTR':50,'TRNR':50,'NRAR':60,'ARNR':60,'SLTR':27,'TRSL':27,'SLAR':81,'ARSL':81,'TRAR':90,'ARTR':90};
var locs = ['AC','SD','TB','FR','NR','SL','TR','AR'];

var minDist = Infinity;
var maxDist = 0;

//path will have a minimum of one item in it
var findDist = function(path, dist) {
    
    if(path.length === locs.length) { 
        if (dist < minDist) {
            minDist = dist;
        }
        if (maxDist < dist) {
            maxDist = dist;
        }
        return;
    }
    
    for(var i = 0; i < locs.length; i++) {
        var loc = locs[i];
        
        if (path.indexOf(loc) !== -1) { 
            //we've already been here, move on to next loc 
            continue; 
        }
        
        //if we get here, we know we are looking at a new loc
        var prevLoc = path[path.length - 1];
        var inc = dists[prevLoc+loc];
        path.push(loc);
        findDist(path, dist + inc);
        path.pop();
    }
}

for(var i = 0; i < locs.length; i++) {
    var loc = locs[i];
    findDist([loc],0);
}
console.log('Minimum distance is ' + minDist);
console.log('Maximum distance is ' + maxDist);