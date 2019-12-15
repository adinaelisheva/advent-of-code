let positions = [[]];
let velocities = [[]];
let numMoons, numDims;

function setup() {
  positions = [[-14, -4, -11],[-9, 6, -7],[4, 1, 4],[2, -14, -9]]; // my real input
  // positions = [[-1, 0, 2],[2, -10, -7],[4, -8, 8],[3, 5, -1]]; // test input
  velocities = [[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
  numMoons = positions.length;
  numDims = positions[0].length;
}

function applyGravityToMoonPair(a, b) {
  const moonA = positions[a];
  const moonB = positions[b];
  const velocityA = velocities[a];
  const velocityB = velocities[b];
  for(let i = 0; i < numDims; i++) {
    let aAmt = 0;
    let bAmt = 0;
    if (moonA[i] > moonB[i]) {
      aAmt = -1;
      bAmt = 1;
    } else if (moonB[i] > moonA[i]) {
      aAmt = 1;
      bAmt = -1;
    }
    velocityA[i] += aAmt;
    velocityB[i] += bAmt;
  }
}
function applyGravity() {
  for (let i = 0; i < numMoons; i++) {
    for (let j = i+1; j < numMoons; j++) {
      applyGravityToMoonPair(i,j);
    }
  }
}
function applyVelocity() {
  for (let i = 0; i < numMoons; i++) {
    for (let j = 0; j < numDims; j++) {
      positions[i][j] += velocities[i][j];
    }
  }
}

function step() {
  applyGravity();
  applyVelocity();
}

function print() {
  for (let i = 0; i < numMoons; i++) {
    console.log(`pos=<x=${positions[i][0]}, y=${positions[i][1]}, z=${positions[i][2]}>, vel=<x=${velocities[i][0]}, y=${velocities[i][1]}, z=${velocities[i][2]}>`)
  }
}

function calculateMoonEnergy(i) {
  const pos = positions[i];
  const vel = velocities[i];
  let velSum = 0;
  let posSum = 0;
  for (let i = 0; i < numDims; i++) {
    velSum += Math.abs(vel[i]);
    posSum += Math.abs(pos[i])
  }
  return velSum * posSum;
}
function calculateSystemEnergy() {
  let energy = 0;
  for (let i = 0; i < numMoons; i++) {
    energy += calculateMoonEnergy(i);
  }
  return energy;
}

setup();
for (let i = 0; i < 1000; i++) {
  step();
}
console.log(`Total system energy after 1000 steps is ${calculateSystemEnergy()}`);

// Part 2

function applyGravityToMoonPairByDim(a, b, dim) {
  const moonA = positions[a];
  const moonB = positions[b];
  const velocityA = velocities[a];
  const velocityB = velocities[b];
  let aAmt = 0;
  let bAmt = 0;
  if (moonA[dim] > moonB[dim]) {
    aAmt = -1;
    bAmt = 1;
  } else if (moonB[dim] > moonA[dim]) {
    aAmt = 1;
    bAmt = -1;
  }
  velocityA[dim] += aAmt;
  velocityB[dim] += bAmt;
}
function applyGravityByDim(dim) {
  for (let i = 0; i < numMoons; i++) {
    for (let j = i+1; j < numMoons; j++) {
      applyGravityToMoonPairByDim(i,j,dim);
    }
  }
}
function applyVelocityByDim(dim) {
  for (let i = 0; i < numMoons; i++) {
    positions[i][dim] += velocities[i][dim];
  }
}
function stepByDim(dim) {
  applyGravityByDim(dim);
  applyVelocityByDim(dim);
}

function hash(dim) {
  let hashStr = ''
  for (let i = 0; i < numMoons; i++) {
    hashStr += `${positions[i][dim]},${velocities[i][dim]};`
  }
  return hashStr;
}

function findCycleByDim(dim) {
  const seenVals = {};
  let steps = 0;
  let hashStr = hash(dim);
  while(!seenVals[hashStr]) {
    seenVals[hashStr] = true;
    steps++;
    stepByDim(dim);
    hashStr = hash(dim);
  }
  return steps;
}

setup();
const xCycle = findCycleByDim(0);
console.log(`X cycles after ${xCycle} steps`);
const yCycle = findCycleByDim(1);
console.log(`Y cycles after ${yCycle} steps`);
const zCycle = findCycleByDim(2);
console.log(`Z cycles after ${zCycle} steps`);

let lcm;
const maxCycle = Math.max(xCycle, yCycle, zCycle);
for (let mult = 1; !lcm; mult++) {
  let product = maxCycle * mult;
  if ((product % xCycle === 0) && (product % yCycle === 0) && (product % zCycle === 0)) {
    lcm = product;
  }
}
console.log(`Found cycle at ${lcm}`);