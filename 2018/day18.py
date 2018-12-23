import time
delay = 0.1

total = 1000000000

hashMap = {}

global forest
forest = []
with open("day18data") as f:
  lines = f.readlines()
  for l in lines:
    forest.append(list(l.strip()))

def printMap(i):
  for _ in range(30):
    print("\n")
  print(f"Generation {i}:")
  for m in forest:
    print("".join(m))

def getAdjacent(x,y):
  ret = []
  for i in range(x-1,x+2):
    for j in range(y-1,y+2):
      if i < 0 or i >= len(forest) or j < 0 or j >= len(forest[0]) or (i == x and j == y):
        continue
      ret.append(forest[i][j])
  return ret

def getForestHash():
  return "".join(["".join(x) for x in forest])

resourceAt10 = 0
loopStart = None
loopDiff = None
for i in range(total):
  newforest = []
  for x,r in enumerate(forest):
    newr = []
    for y,c in enumerate(r):
      neighbors = getAdjacent(x,y)
      newc = c
      if c == "." and neighbors.count("|") >= 3:
        newc = "|"
      if c == "|" and neighbors.count("#") >= 3:
        newc = "#"
      if c == "#" and (neighbors.count("#") == 0 or neighbors.count("|") == 0):
        newc = "."
      newr.append(newc)
    newforest.append(newr)
  forest = newforest
  hashVal = getForestHash()
  if i == 9:
    print(hashVal)
    resourceAt10 = hashVal.count("#") * hashVal.count("|")
  if hashVal in hashMap.keys():
    loopStart = hashMap[hashVal]
    loopDiff = i - loopStart
    print(f"LOOP FOUND: {i} = {loopStart}")
    break
  else:
    hashMap[hashVal] = i
  
  #Some nice output:
  if i < 30:
    printMap(i)
    time.sleep(delay)
  if i == 30:
    for _ in range(10):
      print("\n")
    print("CALCULATING LOOP...")
    for _ in range(10):
      print("\n")

print(f"Resource value after 10 minutes is {resourceAt10}")
#now that we've found the loop, find the equivalent value at total
print(f"Loop starts at {loopStart} and is {loopDiff} items long")
totalEquivalent = loopStart + ((total - 1 - loopStart) % loopDiff)
print(f"{total} is equivalently at {totalEquivalent}")
for val,key in enumerate(hashMap):
  if val == totalEquivalent:
    resourceVal = key.count("#") * key.count("|")
    print(f"Resource value at the end is {resourceVal}")
  
