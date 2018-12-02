lines = None
with open("day1data") as f:
  lines = f.readlines()
frequency = 0
seen = {}
part1 = None
part2 = None
i = 0
numlines = len(lines)
while True:
  line = lines[i]
  frequency += int(line)
  if i == numlines-1 and not part1:
    part1 = frequency
  if not part2:
    if frequency in seen.keys():
      part2 = frequency
    else:
      seen[frequency] = True
  if part1 and part2:
    break
  i = (i + 1) % numlines
print(f"part 1: {part1}")
print(f"part 2: {part2}")