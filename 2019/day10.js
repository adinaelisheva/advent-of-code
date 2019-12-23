const input = ['.#......##.#..#.......#####...#..','...#.....##......###....#.##.....','..#...#....#....#............###.','.....#......#.##......#.#..###.#.','#.#..........##.#.#...#.##.#.#.#.','..#.##.#...#.......#..##.......##','..#....#.....#..##.#..####.#.....','#.............#..#.........#.#...','........#.##..#..#..#.#.....#.#..','.........#...#..##......###.....#','##.#.###..#..#.#.....#.........#.','.#.###.##..##......#####..#..##..','.........#.......#.#......#......','..#...#...#...#.#....###.#.......','#..#.#....#...#.......#..#.#.##..','#.....##...#.###..#..#......#..##','...........#...#......#..#....#..','#.#.#......#....#..#.....##....##','..###...#.#.##..#...#.....#...#.#','.......#..##.#..#.............##.','..###........##.#................','###.#..#...#......###.#........#.','.......#....#.#.#..#..#....#..#..','.#...#..#...#......#....#.#..#...','#.#.........#.....#....#.#.#.....','.#....#......##.##....#........#.','....#..#..#...#..##.#.#......#.#.','..###.##.#.....#....#.#......#...','#.##...#............#..#.....#..#','.#....##....##...#......#........','...#...##...#.......#....##.#....','.#....#.#...#.#...##....#..##.#.#','.#.#....##.......#.....##.##.#.##'];
// const input = ['.#..##.###...#######','##.############..##.','.#.######.########.#','.###.#######.####.#.','#####.##.#.##.###.##','..#####..#.#########','####################','#.####....###.#.#.##','##.#################','#####.##.###..####..','..######..##.#######','####.##.####...##..#','.#####..#.######.###','##...#.##########...','#.##########.#######','.####.#.###.###.#.##','....##.##.###..#####','.#.#.###########.###','#.#.#.#####.####.###','###.##.####.##.#..##'];
// const input = ['.#....#####...#..','##...##.#####..##','##...#...#.#####.','..#.....#...###..','..#.#.....#....##'];

const output = [];
for (let i = 0; i < input.length; i++) {
  output.push(input[i].split(''));
}

function addToSlopes(arr, key, item, isReverse) {
  if (!arr[key]) {
    arr[key] = [];
  }
  isReverse ? arr[key].unshift(item) : arr[key].push(item);
}

function countSlopesForPos(pos) {
  const q1 = {};
  const q2 = {};
  const q3 = {};
  const q4 = {};
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (x === pos[0] && y === pos[1]) {
        continue;
      }
      if (input[y][x] !== '#') {
        continue;
      }
      const xDiff = x - pos[0];
      const yDiff = y - pos[1];
      const slopeRounded = Number(Math.abs(xDiff / yDiff).toFixed(10));
      if (xDiff >= 0 && yDiff < 0) {
        addToSlopes(q1, slopeRounded, [x,y]);
      }
      if (xDiff >= 0 && yDiff >= 0) {
        addToSlopes(q2, slopeRounded, [x,y], true);
      }
      if (xDiff < 0 && yDiff > 0) {
        addToSlopes(q3, slopeRounded, [x,y], true);
      }
      if (xDiff < 0 && yDiff <= 0) {
        addToSlopes(q4, slopeRounded, [x,y]);
      }
    }
  }
  return [q1, q2, q3, q4];
}

let bestCount = 0;
let bestPos, bestSlopes;
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[0].length; x++) { 
    if (input[y][x] !== '#') {
      output[y][x] = ' . ';
      continue;
    } 
    const [q1, q2, q3, q4] = countSlopesForPos([x, y]);
    const count = Object.keys(q1).length + Object.keys(q2).length + Object.keys(q3).length + Object.keys(q4).length;
    output[y][x] = `${count} `;
    if (count > bestCount) { 
      bestCount = count; 
      bestPos = `${x},${y}`;
      bestSlopes = [q1, q2, q3, q4];
    }
  }
}
for (let y = 0; y < output.length; y++) {
  console.log(output[y].join(''));
}

console.log(`The best position (${bestPos}) found ${bestCount} distinct slopes`);

// now... for LASERS
let [q1, q2, q3, q4] = bestSlopes;
let lasered = 0;
let lastLasered;
const laserLimit = 200;
function laser(quadrant, slope) {
  lastLasered = quadrant[slope].pop();
  console.log(`Lasering #${lasered+1}: [${lastLasered}] at slope ${slope}`);
  lasered++;
  if (quadrant[slope].length === 0) {
    delete quadrant[slope];
  }
}
function laserList(q, keys) {
  for(let k of keys) {
    laser(q, k);
    if (lasered === laserLimit) { 
      break; 
    }
  };
}

function numberComp(a,b) {
  a = Number(a);
  b = Number(b);
  return a > b ? 1 : b > a ? -1 : 0;
}
function numberCompReverse(a,b) {
  a = Number(a);
  b = Number(b);
  return a > b ? -1 : b > a ? 1 : 0;
}

while(lasered < laserLimit) {
  let q1keys = Object.keys(q1).sort(numberComp);
  let q2keys = Object.keys(q2).sort(numberCompReverse);
  let q3keys = Object.keys(q3).sort(numberComp);
  let q4keys = Object.keys(q4).sort(numberCompReverse);
  
  console.log('--- Quadrant 1 ---');
  laserList(q1, q1keys);
  if (lasered === laserLimit) { break; }
  console.log('--- Quadrant 2 ---');
  laserList(q2, q2keys);
  if (lasered === laserLimit) { break; }
  console.log('--- Quadrant 3 ---');
  laserList(q3, q3keys);
  if (lasered === laserLimit) { break; }
  console.log('--- Quadrant 4 ---');
  laserList(q4, q4keys);
}

  
console.log(`The ${laserLimit}th asteroid to be LASERED was ${lastLasered} - code is ${lastLasered[0]*100 + lastLasered[1]}`);

