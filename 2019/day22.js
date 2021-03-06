const input = [['d'],['w',25],['c',-5919],['w',56],['d'],['w',20],['d'],['w',53],['c',3262],['w',63],['c',3298],['d'],['c',-4753],['w',57],['d'],['c',9882],['w',42],['d'],['w',40],['c',2630],['w',32],['c',1393],['w',74],['c',2724],['w',23],['c',-3747],['d'],['c',864],['w',61],['d'],['c',-4200],['w',72],['c',-7634],['w',32],['d'],['c',6793],['w',38],['c',7167],['w',10],['c',-9724],['d'],['c',6047],['w',37],['c',7947],['w',63],['d'],['w',9],['c',-9399],['w',26],['c',1154],['w',74],['d'],['c',3670],['w',45],['c',3109],['w',64],['c',-7956],['w',39],['d'],['w',61],['c',-9763],['w',20],['c',4580],['w',30],['d'],['w',62],['d'],['c',-997],['w',54],['c',-1085],['d'],['c',-9264],['d'],['w',11],['c',6041],['w',9],['d'],['c',5795],['w',26],['c',5980],['w',38],['c',1962],['w',25],['c',-565],['w',45],['c',9490],['w',21],['c',-3936],['w',64],['d'],['c',-7067],['w',75],['c',-3975],['w',29],['d'],['c',-7770],['d'],['w',12],['c',8647],['w',49]];
// const input = [['d'],['c',-2],['w',7],['c',8],['c',-4],['w',7],['c',3],['w',9],['w',3],['c',-1]];

let deck = [];
for (let i = 0; i < 10007; i++) {
  deck.push(i);
}

function d() {
  deck = deck.reverse();
}
function c(n) {
  let tmp = deck.splice(n);
  deck = tmp.concat(deck);
}
function w(n) {
  const tmpDeck = [];
  let pos = 0;
  for(let i = 0; i < deck.length; i++) {
    tmpDeck[pos] = deck[i];
    pos = (pos + n) % deck.length;
  }
  deck = tmpDeck;
}

input.forEach((inst) => {
  switch (inst[0]) {
    case 'd':
      d();
      break;
    case 'c':
      c(inst[1]);
      break;
    case 'w':
      w(inst[1]);
      break;
  }
});

for (let i = 0; i < deck.length; i++) {
  if (deck[i] === 2019) {
    console.log(`2019 is at position ${i}`);
    break;
  }
}