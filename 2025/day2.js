const testInput = ['11-22','95-115','998-1012','1188511880-1188511890','222220-222224','1698522-1698528','446443-446449','38593856-38593862','565653-565659','824824821-824824827','2121212118-2121212124'];
const input = ['516015-668918','222165343-222281089','711089-830332','513438518-513569318','4-14','4375067701-4375204460','1490-3407','19488-40334','29275041-29310580','4082818-4162127','12919832-13067769','296-660','6595561-6725149','47-126','5426-11501','136030-293489','170-291','100883-121518','333790-431800','897713-983844','22-41','42727-76056','439729-495565','43918886-44100815','725-1388','9898963615-9899009366','91866251-91958073','36242515-36310763'];
const INPUT_TO_USE = input;

let sumPt1 = 0;
let sumPt2 = 0;
for (const range of INPUT_TO_USE) {
    const start = Number(range.split('-')[0]);
    const end = Number(range.split('-')[1]);
    for (let id = start; id <= end; id++) {
        const numStr = String(id);
        // First check part 1
        if (numStr.length % 2 === 0) {
            const splitPt = numStr.length / 2;
            if (numStr.substring(0, splitPt) === numStr.substring(splitPt)) {
                console.log(`${id} splits to 2 ${numStr.substring(splitPt)}s, adding ${id} for parts 1 and 2`);
                sumPt1 += id;
                sumPt2 += id;
                continue;
            }
        }
        outer: for (let i = 1; i <= numStr.length / 2; i++) {
            if (numStr.length % i !== 0) {
                continue;
            }
            const numToMatch = numStr.substring(0,i);
            let numStrToConsume = `${numStr}`;
            while (numStrToConsume.length > 0) {
                if (numStrToConsume.substring(0,i) !== numToMatch) {
                    continue outer;
                }
                numStrToConsume = numStrToConsume.substring(i);
            }
            // If we get here, the string is a set of repeated matches
            sumPt2 += id;
            console.log(`${id} splits to ${i} ${numToMatch}s, adding ${id} for part 2 only`);
            break;
        }
    }
}
console.log(`Part 1: ${sumPt1}, part 2: ${sumPt2}`);

