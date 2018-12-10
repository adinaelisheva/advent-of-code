import string

line = None
with open("day5data") as f:
  line = f.readlines()[0]

def reduce(line):
  i = 1
  while i < len(line):
    while(i > 0 and i < len(line) and line[i-1] != line[i] and line[i-1].lower() == line[i].lower()):
      line = line[0:i-1] + line[i+1:len(line)]
      if i > 1:
        i -= 1
    i += 1
  return len(line)

print(f"final line length is {reduce(line)}")

#part 2
minlen = len(line)
minchar = None
for c1 in list(string.ascii_lowercase):
  c2 = c1.upper()
  lineP2 = line.replace(c1,"").replace(c2,"")
  curlen = reduce(lineP2)
  if curlen < minlen:
    minlen = curlen
    minchar = c1
minchar2 = minchar.upper()
print(f"By removing {minchar}/{minchar2} you can get down to {minlen}")