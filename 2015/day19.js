var molMap = {'Al':['ThF','ThRnFAr'],'B':['BCa','TiB','TiRnFAr'],'Ca':['CaCa','PB','PRnFAr','SiRnFYFAr','SiRnMgAr','SiTh'],'F':['CaF','PMg','SiAl'],'H':['CRnAlAr','CRnFYFYFAr','CRnFYMgAr','CRnMgYFAr','HCa','NRnFYFAr','NRnMgAr','NTh','OB','ORnFAr'],'Mg':['BF','TiMg'],'N':['CRnFAr','HSi'],'O':['CRnFYFAr','CRnMgAr','HP','NRnFAr','OTi'],'P':['CaP','PTi','SiRnFAr'],'Si':['CaSi'],'Th':['ThCa'],'Ti':['BP','TiTi'],'e':['HF','NAl','OMg']};

var med = 'ORnPBPMgArCaCaCaSiThCaCaSiThCaCaPBSiRnFArRnFArCaCaSiThCaCaSiThCaCaCaCaCaCaSiRnFYFArSiRnMgArCaSiRnPTiTiBFYPBFArSiRnCaSiRnTiRnFArSiAlArPTiBPTiRnCaSiAlArCaPTiTiBPMgYFArPTiRnFArSiRnCaCaFArRnCaFArCaSiRnSiRnMgArFYCaSiRnMgArCaCaSiThPRnFArPBCaSiRnMgArCaCaSiThCaSiRnTiMgArFArSiThSiThCaCaSiRnMgArCaCaSiRnFArTiBPTiRnCaSiAlArCaPTiRnFArPBPBCaCaSiThCaPBSiThPRnFArSiThCaSiThCaSiThCaPTiBSiRnFYFArCaCaPRnFArPBCaCaPBSiRnTiRnFArCaPRnFArSiRnCaCaCaSiThCaRnCaFArYCaSiRnFArBCaCaCaSiThFArPBFArCaSiRnFArRnCaCaCaFArSiRnFArTiRnPMgArF';

var generateMols = function(resMap,mol,i,l) {
    if(i+l > mol.length) { return; }
    var key = mol.substr(i,l);
    var subs = molMap[key];
    if(!subs) { return; }
    for(var j = 0; j < subs.length; j++) {
        var newStr = mol.substring(0,i) + subs[j] + mol.substring(i+l);
        resMap[newStr] = true;
    }
}

var generateAllMols = function(mol) {
    var resMap = {}
    for(var i = 0; i < mol.length; i++) {
        generateMols(resMap,mol,i,1);
        generateMols(resMap,mol,i,2);
    }
    return resMap;
}

var resMap = generateAllMols(med);
console.log('Found ' + Object.keys(resMap).length + ' molecules');

var gMinSteps = Infinity;
var stepsFromHere = {};

//after some figuring things out (and looking on reddit) all you need to do for part 2 is count
med = med.replace(/Rn/g,'(');
med = med.replace(/Ar/g,')');
med = med.replace(/Y/g,',');
med = med.replace(/[a-z]/g,'');
med = med.replace(/[A-Z]/g,'X');
//console.log(med);
var xs = med.match(/X/g).length;
var commas = med.match(/,/g).length;
console.log('It takes ' + (xs - commas - 1) + ' steps');