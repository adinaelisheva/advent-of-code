class sample:
  def __init__(self):
    self.before = None
    self.after = None
    self.op = None
    self.arg1 = None
    self.arg2 = None
    self.out = None
  
  def __str__(self):
    return f"{self.before} --> {self.op}({self.arg1}, {self.arg2}) -> {self.out} --> {self.after}"

samples = []

with open("day16data") as f:
  lines = f.readlines()
  s = None
  inSample = False
  for l in lines:
    if l.startswith("Before:"):
      s = sample()
      s.before = [int(x) for x in l[9:19].split(", ")]
      inSample = True
    elif l.startswith("After:"):
      s.after = [int(x) for x in l[9:19].split(", ")]
      samples.append(s)
      inSample = False
    elif inSample and len(l) > 0:
      args = l.strip().split(" ")
      s.op = int(args[0])
      s.arg1 = int(args[1])
      s.arg2 = int(args[2])
      s.out = int(args[3])

opcodes = {}

def reducePossibilities(olds, news):
  if olds == None:
    return news
  ret = []
  for x in olds:
    if x in news:
      ret.append(x)
  return ret

threeOrMore = 0
for s in samples:
  possibilities = []
  if s.before[s.arg1] + s.before[s.arg2] == s.after[s.out]:
    possibilities.append('addr')
  if s.before[s.arg1] + s.arg2 == s.after[s.out]:
    possibilities.append('addi')
  if s.before[s.arg1] * s.before[s.arg2] == s.after[s.out]:
    possibilities.append('mulr')
  if s.before[s.arg1] * s.arg2 == s.after[s.out]:
    possibilities.append('muli')
  if s.before[s.arg1] & s.before[s.arg2] == s.after[s.out]:
    possibilities.append('banr')
  if s.before[s.arg1] & s.arg2 == s.after[s.out]:
    possibilities.append('bani')
  if s.before[s.arg1] | s.before[s.arg2] == s.after[s.out]:
    possibilities.append('borr')
  if s.before[s.arg1] | s.arg2 == s.after[s.out]:
    possibilities.append('bori')
  if s.before[s.arg1] == s.after[s.out]:
    possibilities.append('setr')
  if s.arg1 == s.after[s.out]:
    possibilities.append('seti')
  if (s.arg1 > s.before[s.arg2] and s.after[s.out] == 1) or (s.arg1 <= s.before[s.arg2] and s.after[s.out] == 0):
    possibilities.append('gtir')
  if (s.before[s.arg1] > s.arg2 and s.after[s.out] == 1) or (s.before[s.arg1] <= s.arg2 and s.after[s.out] == 0):
    possibilities.append('gtri')
  if (s.before[s.arg1] > s.before[s.arg2] and s.after[s.out] == 1) or (s.before[s.arg1] <= s.before[s.arg2] and s.after[s.out] == 0):
    possibilities.append('gtrr')
  if (s.arg1 == s.before[s.arg2] and s.after[s.out] == 1) or (s.arg1 != s.before[s.arg2] and s.after[s.out] == 0):
    possibilities.append('eqir')
  if (s.before[s.arg1] == s.arg2 and s.after[s.out] == 1) or (s.before[s.arg1] != s.arg2 and s.after[s.out] == 0):
    possibilities.append('eqri')
  if (s.before[s.arg1] == s.before[s.arg2] and s.after[s.out] == 1) or (s.before[s.arg1] != s.before[s.arg2] and s.after[s.out] == 0):
    possibilities.append('eqrr')

  if len(possibilities) >= 3:
    threeOrMore += 1

  if not s.op in opcodes.keys():
    opcodes[s.op] = None
  opcodes[s.op] = reducePossibilities(opcodes[s.op], possibilities)

def isDone(opcodes):
  for o in opcodes:
    if len(opcodes[o]) > 1:
      return False
  return True

while not isDone(opcodes):
  for o in opcodes:
    if len(opcodes[o]) == 1:
      claimed = opcodes[o][0]
      for x in opcodes:
        if x == o:
          continue
        if claimed in opcodes[x]:
          opcodes[x].remove(claimed)

print(f"{threeOrMore} samples could be three or more opcodes")
for o in opcodes:
  print(f"{o}: {opcodes[o]}")

