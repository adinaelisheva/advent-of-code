global gridSerialNumber
gridSerialNumber = 6878

def getPower(x, y):
  global gridSerialNumber
  rackID = x + 10
  return (((rackID * y + gridSerialNumber) * rackID) // 100) % 10 - 5

prevSums = {}

def getSquarePower(x, y, s, grid):
  sqSum = 0
  key = f"{x},{y},{s-1}"
  if key in prevSums.keys():
    sqSum = prevSums[key]
    for i in range(0, s):
      sqSum += grid[x+s-1][y+i]
      sqSum += grid[x+i][y+s-1]
    sqSum -= grid[x+s-1][y+s-1]
    prevSums.pop(key)
  else:
    for i in range(x, x+s):
      for j in range(y, y+s):
        sqSum += grid[i][j]
  prevSums[f"{x},{y},{s}"] = sqSum
  return sqSum

grid = []

for i in range(300):
  row = []
  for j in range(300):
    row.append(getPower(i,j))
  grid.append(row)

maxSquare = 0
maxCoord = None
maxThree = None
for s in range(3, 301):
  print(f"Checking squares of size {s}")
  for i in range(0, 299-s):
    for j in range(0, 299-s):
      sp = getSquarePower(i,j,s,grid)
      if sp > maxSquare:
        maxSquare = sp
        maxCoord = f"{i},{j},{s}"
  if s == 3:
    maxThree = maxCoord

print(f"Coord of max power at 3 is {maxThree}")
print(f"Coord of max power is {maxCoord}")


