const input = '372304-847060';

const numStrs = input.split('-');
const min = Number(numStrs[0]);
const max = Number(numStrs[1]);


function isValid(numStr) {
  let matches = 1;
  let shortestMatch = Infinity;
  for (let i = 1; i < numStr.length; i++) {
    let d1 = Number(numStr[i-1]);
    let d2 = Number(numStr[i]);
    if (d1 > d2) {
      // never decrease
      return [false, false];
    }
    if (d1 === d2) {
      matches++;
    } else {
      // keep track of how long the shortest match string we found is (not counting singles)
      if (matches > 1 && matches < shortestMatch) {
        shortestMatch = matches;
      }
      matches = 1;
    }
  }
  if (matches > 1 && matches < shortestMatch) {
    shortestMatch = matches;
  }
  // if we got here, there are no decreasings. Now we check dups for both parts
  return [shortestMatch !== Infinity, shortestMatch === 2];
}

let count1 = 0;
let count2 = 0;
for (let i = min; i <= max; i++) {
  let [valid1, valid2] = isValid(`${i}`);
  count1 += valid1 ? 1 : 0;
  count2 += valid2 ? 1 : 0;
}
console.log(`Found ${count1} valid passwords`);
console.log(`Found ${count2} more-valid passwords`);