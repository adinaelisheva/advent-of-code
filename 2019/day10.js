const input = ['.#......##.#..#.......#####...#..','...#.....##......###....#.##.....','..#...#....#....#............###.','.....#......#.##......#.#..###.#.','#.#..........##.#.#...#.##.#.#.#.','..#.##.#...#.......#..##.......##','..#....#.....#..##.#..####.#.....','#.............#..#.........#.#...','........#.##..#..#..#.#.....#.#..','.........#...#..##......###.....#','##.#.###..#..#.#.....#.........#.','.#.###.##..##......#####..#..##..','.........#.......#.#......#......','..#...#...#...#.#....###.#.......','#..#.#....#...#.......#..#.#.##..','#.....##...#.###..#..#......#..##','...........#...#......#..#....#..','#.#.#......#....#..#.....##....##','..###...#.#.##..#...#.....#...#.#','.......#..##.#..#.............##.','..###........##.#................','###.#..#...#......###.#........#.','.......#....#.#.#..#..#....#..#..','.#...#..#...#......#....#.#..#...','#.#.........#.....#....#.#.#.....','.#....#......##.##....#........#.','....#..#..#...#..##.#.#......#.#.','..###.##.#.....#....#.#......#...','#.##...#............#..#.....#..#','.#....##....##...#......#........','...#...##...#.......#....##.#....','.#....#.#...#.#...##....#..##.#.#','.#.#....##.......#.....##.##.#.##'];
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
      const slopeStr = (xDiff / yDiff).toFixed(10);
      if (xDiff > 0 && yDiff <= 0) {
        addToSlopes(q1, slopeStr, [x,y], true);
      }
      if (xDiff > 0 && yDiff > 0) {
        addToSlopes(q2, slopeStr, [x,y]);
      }
      if (xDiff <= 0 && yDiff > 0) {
        addToSlopes(q3, slopeStr, [x,y]);
      }
      if (xDiff <= 0 && yDiff <= 0) {
        addToSlopes(q4, slopeStr, [x,y], true);
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
    output[y][x] = count;
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
let done = false;
let [q1, q2, q3, q4] = bestSlopes;
let lasered = 0;
let lastLasered;
function laser(quadrant, slope) {
  lastLasered = quadrant[slope].pop();
  lasered++;
  if (quadrant[slope].length === 0) {
    delete quadrant[slope];
  }
}

while(lasered < 200) {
  let q1keys = Object.keys(q1).sort();
  let q2keys = Object.keys(q2).sort().reverse();
  let q3keys = Object.keys(q3).sort().reverse();
  let q4keys = Object.keys(q4).sort();
  q1keys.forEach((k) => laser(q1, k));
  q2keys.forEach((k) => laser(q2, k));
  q3keys.forEach((k) => laser(q3, k));
  q4keys.forEach((k) => laser(q4, k));
}
console.log(`The 200th asteroid to be LASERED was ${lastLasered} - code is ${lastLasered[0]*100 + lastLasered[1]}`);

