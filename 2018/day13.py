import time 
import sys

numArgs = len(sys.argv)
display = True if numArgs > 1 and sys.argv[1] == "--display" else False
sleepAmt = int(sys.argv[2]) if numArgs > 2 else 0

global cartmap
cartmap = []

with open("day13data") as f:
  lines = f.readlines()
  for l in lines:
    cartmap.append(list(l.strip("\n")))

carts = []
for (x,l) in enumerate(cartmap):
  for (y,c) in enumerate(l):
    if c in "^v><":
      carts.append({
        "x": x,
        "y": y,
        "c": c,
        "turns": 0,
      })
      cartmap[x][y] = "|" if c in "^v" else "-"

def shiftCart(cart):
  if cart["c"] == "^":
    return (cart["x"]-1, cart["y"])
  if cart["c"] == "v":
    return (cart["x"]+1, cart["y"])
  if cart["c"] == ">":
    return (cart["x"], cart["y"]+1)
  if cart["c"] == "<":
    return (cart["x"], cart["y"]-1)
  return (cart["x"], cart["y"])

def turnCart(track, cart):
  if track == "+":
    turns = cart["turns"] % 3
    cart["turns"] += 1
    if turns == 0:
      #turn left
      track = "\\"
    elif turns == 2:
      #turn right
      track = "/"
    # else go straight aka do nothing

  if track == "/":
    if cart["c"] == "^":
      cart["c"] =  ">"
    elif cart["c"] == "v":
      cart["c"] =  "<"
    elif cart["c"] == "<":
      cart["c"] =  "v"
    elif cart["c"] == ">":
      cart["c"] =  "^"
  elif track == "\\":
    if cart["c"] == "^":
      cart["c"] =  "<"
    elif cart["c"] == "v":
      cart["c"] =  ">"
    elif cart["c"] == "<":
      cart["c"] =  "^"
    elif cart["c"] == ">":
      cart["c"] =  "v"
  
  return cart["c"]

def advanceCart(cart):
  global cartmap
  newCartPos = shiftCart(cart)
  nextSpot = cartmap[newCartPos[0]][newCartPos[1]]
  newCartDir = turnCart(nextSpot, cart)
  cart["x"] = newCartPos[0]
  cart["y"] = newCartPos[1]
  return cart

def printMap():
  toPrint = ""
  for l in range(500):
    toPrint += "\n"
  for (x,l) in enumerate(cartmap):
    line = ""
    for (y,t) in enumerate(l):
      cartChar = None
      for c in carts:
        if c["x"] == x and c["y"] == y:
          cartChar = c["c"]
          break
      line += cartChar if cartChar else t
    toPrint += f"{line}\n"
  print(toPrint)

printMap()

def findCollision(carts):
  seen = set()
  for c in carts:
    coords = (c["x"], c["y"])
    if coords in seen:
      cartmap[c["x"]][c["y"]] = "*"
      return coords
    else:
      seen.add(coords)
  return None

collided = None
while not collided:
  for (i,c) in enumerate(carts):
    carts[i] = advanceCart(c)
  collided = findCollision(carts)
  if (display):
    printMap()
  time.sleep(sleepAmt)

print(f"Location of first collision is {collided}")
