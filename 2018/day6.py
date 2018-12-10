INFINITY = 10000000 #for the purposes of this puzzle

lines = None
with open("day6data") as f:
  lines = f.readlines()

points = []
for line in lines:
  p = line.replace(" ","").split(",")
  points.append([int(p[0]), int(p[1])])

minX = INFINITY
minY = INFINITY
maxX = 0
maxY = 0

for p in points:
  if p[0] < minX:
    minX = p[0]
  if p[0] > maxX:
    maxX = p[0]
  if p[1] < minY:
    minY = p[1]
  if p[1] > maxY:
    maxY = p[1]

closestPointCount = {}
closeRegionSize = 0
# run through every x,y point in a large enough block
for i in range(minX - 1, maxX + 1):
  for j in range(minY - 1, maxY + 1):
    #keep 2 maps because we need the data flow to go both ways later
    distsToPoints = {}
    pointsToDists = {}
    sumDists = 0
    for p in points:
      dist = (abs(p[0] - i) + abs(p[1] - j))
      sumDists += dist
      key = f"{p[0]},{p[1]}"
      distsToPoints[dist] = key
      pointsToDists[key] = dist

    if sumDists < 10000:
      closeRegionSize += 1

    # check for min (and make sure it's not a tie)
    minDist = min(distsToPoints)
    if list(pointsToDists.values()).count(minDist) > 1:
      continue
    key = distsToPoints[minDist]
    
    # adjust counts accordingly
    if i == minX - 1 or i == maxX or j == minY - 1 or j == maxY:
      # on the edge, this is an infinite zone so ignore it
      closestPointCount[key] = -1
    elif not key in closestPointCount.keys():
      closestPointCount[key] = 1
    elif closestPointCount[key] != -1:
      closestPointCount[key] += 1
    
print(f"Largest finite area is {max(closestPointCount.values())}")
print(f"Close region size is {closeRegionSize}")
