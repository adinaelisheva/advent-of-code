particles = []
with open("day10data") as f:
  for line in f.readlines():
    line = line.strip().replace("position=<","").replace("> velocity=<",",").replace(" ","").replace(">","").split(",")
    p = [
      int(line[0].strip()),
      int(line[1].strip()),
      int(line[2].strip()),
      int(line[3].strip()),
    ]
    particles.append(p)

def getCorners():
  minX = 10000000
  maxX = 0
  minY = 10000000
  maxY = 0
  for p in particles:
    if p[0] < minX:
      minX = p[0]
    if p[0] > maxX:
      maxX = p[0]
    if p[1] < minY:
      minY = p[1]
    if p[1] > maxY:
      maxY = p[1]
  return [minX, maxX, minY, maxY]

def getSize():
  c = getCorners()
  return [c[1] - c[0], c[3] - c[2]]

global ticks
ticks = 0

def tick(amt = 1):
  global ticks
  ticks += amt
  for p in particles:
    p[0] += amt * p[2]
    p[1] += amt * p[3]

s = getSize()
oldW = s[0]
oldH = s[1]

while True:
  tick()
  s = getSize()
  w = s[0]
  h = s[1]
  if w > oldW and h > oldH:
    # particles are bouncing back - go back 1 and print
    tick(-1)
    break
  else:
    oldW = w
    oldH = h

visual = set()
for p in particles:
  key = f"{p[0]},{p[1]}"
  visual.add(key)

c = getCorners()
for j in range(c[2]-3, c[3]+3):
  rowstr = ''
  for i in range(c[0]-3, c[1]+3):
    key = f"{i},{j}"
    if key in visual:
      rowstr += '#'
    else:
      rowstr += '.'
  print(rowstr)

print(f"this took {ticks} seconds")