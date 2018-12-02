lines = None
with open("day2data") as f:
  lines = f.readlines()

# Part One
twos = 0
threes = 0
for line in lines:
  letters = "".join(set(line))
  two = 0
  three = 0
  for letter in letters:
    c = line.count(letter)
    if c == 2:
      two = 1
    if c == 3:
      three = 1
  twos = twos + two
  threes = threes + three
print(f"checksum: {twos * threes}")

# Part Two
def findMatch(lines):
  numlines = len(lines)
  i = 0
  while i < numlines-1:
    j = i+1
    while j < numlines:
      word1 = lines[i]
      word2 = lines[j]
      diff = 0
      letters = ""
      for c in range(len(word1) - 1):
        if word1[c] != word2[c]:
          diff += 1
        else:
          letters += word1[c]
      if diff == 1:
        # We've found the correct IDs
        return letters
      j = j + 1
    i = i + 1

print(f"Common letters: {findMatch(lines)}")