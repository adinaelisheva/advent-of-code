rules = {}
state = {}

# arbitrarily large number past which the only change is 
# shifting +1 to the right
shiftGeneration = 150

def printState(state):
  s = ""
  for x in range(-5, 130):
    if not x in state.keys():
      s += '.'
    else:
      s += "#" if state[x] else "."
  print(s)

with open("day12data") as f:
  lines = f.readlines()
  startState = lines[0].replace("initial state: ", "")
  for i in range(len(startState)):
    c = startState[i]
    if c == "#":
      state[i] = True
    else:
      state[i] = False
  for i in range(2,len(lines)):
    line = lines[i].split(" => ")
    rules[line[0]] = line[1].strip()

total20 = 0

for g in range(shiftGeneration):
  indices = [x for x in state.keys()]
  indices.sort()

  # Fill in blanks on the ends of the "array"
  start = indices[0]
  for i in range(start-4, start):
    state[i] = False
  end = indices[len(indices) - 1]
  for i in range(end, end+4):
    state[i] = False
  
  newstate = {}
  for i in range(start-2, end+2):
    key = ""
    for k in range(i-2,i+3):
      key += "#" if state[k] else "."
    newVal = False
    if key in rules:
      newVal = rules[key]
    newstate[i] = True if newVal == "#" else False
  state = newstate

  if g == 20:
    total20 = sum([x for x in state if state[x]])
  
  printState(state)

print(f"Total planted pots after 20: {total20}")

numPots = sum([1 for x in state if state[x]])
totalPots = sum([x for x in state if state[x]])
total = (50000000000 - shiftGeneration) * numPots + totalPots
print(f"Total planted pots settles to: {total}")