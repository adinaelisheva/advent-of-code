import time

global mobs
mobs = []
global dungeon
dungeon = []
width = None
height = None

class mob:
  def __init__(self, x, y, t):
    self.atk = 3
    self.hp = 200
    self.x = x
    self.y = y
    self.type = t
  
  def __str__(self):
    return f"{self.type}: {self.hp}HP @ ({self.x},{self.y})"

def compare(mob):
  y = str(mob.y)
  y = y if len(y) > 1 else "0" + y
  return str(mob.x) + y

def printDungeon(withMobs = True, targets = []):
  d = []
  hasTargets = len(targets) > 0
  if withMobs or hasTargets:
    for row in dungeon:
      d.append(list.copy(row))
    if withMobs:
      for m in mobs:
        d[m.x][m.y] = m.type
    if hasTargets:
      for t in targets:
        d[t[0]][t[1]] = "?"
  else:
    d = dungeon
  
  out = ""
  for _ in range(23):
    out += "\n"
  for row in d:
    out += "".join(row)
    out += "\n"
  print(out)

def printMobs():
  for m in mobs:
    print(m)

def isValidSpot(x,y):
  if x < 0 or x >= width or y < 0 or y >= height:
    return False
  for m in mobs:
    if x == m.x and y == m.y:
      return False
  return dungeon[x][y] == "."

def findTargets(mob):
  ret = []
  for m in mobs:
    if m == mob or m.type == mob.type:
      continue
    options = [
      (m.x, m.y-1),
      (m.x, m.y+1),
      (m.x-1, m.y),
      (m.x+1, m.y),
    ]
    for o in options:
      if isValidSpot(o[0], o[1]):
        ret.append(o)
  return ret

with open("day15data") as f:
  lines = f.readlines()
  for x,l in enumerate(lines):
    l = list(l.strip("\n"))
    for y,c in enumerate(l):
      if c == "G" or c == "E":
        mobs.append(mob(x, y, c))
        l[y] = "."
    dungeon.append(l)
  width = len(dungeon)
  height = len(dungeon[0])
    
# while True:
#   mobs = sorted(mobs, key=compare)
#   for m in mobs:
#     targetSquares = findTargets(m)
#   printDungeon()
#   printMobs()

for m in mobs:
  printDungeon(True, findTargets(m))