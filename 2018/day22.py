depth = 4002
targetX = 5
targetY = 746

geologicIndex = {}
erosionLevel = {}
regionType = {}

riskSum = 0
for x in range(targetX+1):
  for y in range(targetY+1):
    if x == y == 0 or (x == targetX and y == targetY):
      geologicIndex[(x,y)] = 0
    elif y == 0:
      geologicIndex[(x,y)] = x*16807
    elif x == 0:
      geologicIndex[(x,y)] = y*48271
    else:
      geologicIndex[(x,y)] = erosionLevel[(x-1,y)] * erosionLevel[(x,y-1)]
    
    erosionLevel[(x,y)] = (geologicIndex[(x,y)] + depth) % 20183
    regionType[(x,y)] = erosionLevel[(x,y)] % 3

    riskSum += regionType[(x,y)]

print(riskSum)
