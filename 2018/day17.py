import time

xOffset = 400 #note: xmin is 413
xTotal = 500
spring = (0, 500-xOffset)

global shouldPrint
shouldPrint = False
delay = 0.1
breakpoint = None

seams = []
yMin = 100000
yMax = 0
with open("day17data") as f:
  for l in f.readlines():
    parts = l.strip().split(", ")
    seam = [None, None]
    for p in parts:
      data = p.split("=")
      loc = None
      if ".." in data[1]:
        loc = [int(x) for x in data[1].split("..")]
      else:
        loc = [int(data[1])]
      curMin = min(loc)
      curMax = max(loc)
      if data[0] == "x":
        loc = [x-xOffset for x in loc]
        seam[0] = loc
      else:
        seam[1] = loc
        yMin = curMin if curMin < yMin else yMin
        yMax = curMax if curMax > yMax else yMax
    seams.append(seam)

global grid
grid = []
for row in range(yMax+1):
  row = ["."] * (xTotal)
  grid.append(row)

for seam in seams:
  isRow = len(seam[0]) > 1
  v = 0 if isRow else 1 #varying index
  s = seam[(v + 1) % 2][0] #steady index
  vMin = seam[v][0]
  vMax = seam[v][1]
  for i in range(vMin, vMax+1):
    if isRow:
      grid[s][i] = "#"
    else:
      grid[i][s] = "#"

grid[spring[0]][spring[1]] = "+"

def printGrid(curR, curC, char = "*", sub=False):
  global grid
  if not shouldPrint:
    return
  for _ in range(30):
    print("\n")
  if sub:
    cMin = max([0, curC - 150])
    cMax = min([len(grid[0]), curC + 150])
    rMin = max([0, curR - 25])
    rMax = min([len(grid), curR + 25])
  else:
    cMin = 0
    cMax = len(grid[0])
    rMin = 0
    rMax = len(grid)
  for x in range(rMin,rMax):
    out = ""
    for y in range(cMin,cMax):
      if x == curR and y == curC:
        out += char
      else:
        out += grid[x][y]
    print(out)
  if delay:
    time.sleep(delay)

count = 0
with open("day17out") as f:
  for l in f.readlines():
    count += l.count("=")
print(f"By hand: {count} tiles have been touched")

def touch(r,c):
  global grid
  if grid[r][c] == ".":
    grid[r][c] = "|"

def countWater(yMin, yMax):
  global grid
  total = 0
  for y in range(yMin, yMax+1):
    for x in range(0,len(grid[0])):
      if grid[y][x] == "~" or grid[y][x] == "|":
        total += 1
  return total

if shouldPrint:
  # now simulate the water
  starts = [[spring[0], spring[1]]]
  reset = True
  for _ in range(1000):
    count = countWater(yMin, yMax)
    if breakpoint:
      print(breakpoint - count)
      if count == breakpoint:
        shouldPrint = True
    else:
      print(count)
    if reset == True:
      start = starts.pop()
      reset = False
    wr = start[0]
    wc = start[1]
    while grid[wr][wc] == "~":
      #start above the water line
      wr -= 1
    #first go down as far as you can
    while wr < len(grid)-1 and grid[wr+1][wc] != "#" and grid[wr+1][wc] != "~":
      touch(wr,wc)
      printGrid(wr,wc,"*",sub=True)
      wr += 1
    if wr == yMax:
      #fell off the bottom of the grid
      touch(wr,wc)
      if len(starts) > 0:
        reset = True
        continue
      else:
        printGrid(wr,wc,"*",sub=True)
        break

    #now check if you're in a bowl
    leftwall = None
    rightwall = None
    i = wc
    while i > 0:
      printGrid(wr,i,"?",sub=True)
      touch(wr,i)
      if grid[wr+1][i] != '#' and grid[wr+1][i] != '~':
        # found a hole in the floor - next time start here
        starts.append([wr,i])
        reset = True
        break
      if grid[wr][i-1] == '#':
        leftwall = i
        break
      i-=1
    i = wc
    while i < xTotal-1:
      printGrid(wr,i,"?",sub=True)
      touch(wr,i)
      if grid[wr+1][i] != '#' and grid[wr+1][i] != '~':
        # found a hole in the floor
        starts.append([wr,i])
        reset = True
        break
      if grid[wr][i+1] == '#':
        rightwall = i
        break
      i+=1
    if leftwall and rightwall:
      for x in range(leftwall, rightwall+1):
        grid[wr][x] = "~"
      printGrid(wr,x,"*",sub=True)


  # now count
  print(f"{countWater(yMin, yMax)} tiles have been touched")