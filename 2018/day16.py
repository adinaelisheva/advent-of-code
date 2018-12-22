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
program = []

# Parse the file:
with open("day16data") as f:
  lines = f.readlines()
  s = None
  inSample = False
  for l in lines:
    l = l.strip()
    if l.startswith("Before:"):
      s = sample()
      s.before = [int(x) for x in l[9:19].split(", ")]
      inSample = True
    elif l.startswith("After:"):
      s.after = [int(x) for x in l[9:19].split(", ")]
      samples.append(s)
      inSample = False
    elif inSample and len(l) > 0:
      args = l.split(" ")
      s.op = int(args[0])
      s.arg1 = int(args[1])
      s.arg2 = int(args[2])
      s.out = int(args[3])
    elif len(l) > 0:
      program.append([int(x) for x in l.split(" ")])

opcodes = {}

# helper to figure out what opcodes a # could be
def reducePossibilities(olds, news):
  if olds == None:
    return news
  ret = []
  for x in olds:
    if x in news:
      ret.append(x)
  return ret

# run through all of the samples to see which opcode they could be
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

# helper to check if all opcodes are determined
def isDone(opcodes):
  for o in opcodes:
    if len(opcodes[o]) > 1:
      return False
  return True

# elimination until all opcodes are determined
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

# run the program
registers = [0,0,0,0]
for step in program:
  op = opcodes[step[0]][0]
  arg1 = step[1]
  arg2 = step[2]
  out = step[3]
  if op == "addr":
    registers[out] = registers[arg1] + registers[arg2]
  if op == "addi":
    registers[out] = registers[arg1] + arg2
  if op == "mulr":
    registers[out] = registers[arg1] * registers[arg2]
  if op == "muli":
    registers[out] = registers[arg1] * arg2
  if op == "banr":
    registers[out] = registers[arg1] & registers[arg2]
  if op == "bani":
    registers[out] = registers[arg1] & arg2
  if op == "borr":
    registers[out] = registers[arg1] | registers[arg2]
  if op == "bori":
    registers[out] = registers[arg1] | arg2
  if op == "setr":
    registers[out] = registers[arg1]
  if op == "seti":
    registers[out] = arg1
  if op == "gtir":
    registers[out] = 1 if arg1 > registers[arg2] else 0
  if op == "gtri":
    registers[out] = 1 if registers[arg1] > arg2 else 0
  if op == "gtrr":
    registers[out] = 1 if registers[arg1] > registers[arg2] else 0
  if op == "eqir":
    registers[out] = 1 if arg1 == registers[arg2] else 0
  if op == "eqri":
    registers[out] = 1 if registers[arg1] == arg2 else 0
  if op == "eqrr":
    registers[out] = 1 if registers[arg1] == registers[arg2] else 0

print(registers)