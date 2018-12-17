import time 
import sys

numArgs = len(sys.argv)
display = True if numArgs > 1 and sys.argv[1] == "--display" else False
sleepAmt = float(sys.argv[2]) if numArgs > 2 else 0

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
      if cart["c"] == "^":
        cart["c"] =  "<"
      elif cart["c"] == "v":
        cart["c"] =  ">"
      elif cart["c"] == "<":
        cart["c"] =  "v"
      elif cart["c"] == ">":
        cart["c"] =  "^"
    elif turns == 2:
      #turn right
      if cart["c"] == "^":
        cart["c"] =  ">"
      elif cart["c"] == "v":
        cart["c"] =  "<"
      elif cart["c"] == "<":
        cart["c"] =  "^"
      elif cart["c"] == ">":
        cart["c"] =  "v"
    # else go straight aka do nothing

  elif track == "/":
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

def advanceCart(cart):
  global cartmap
  newCartPos = shiftCart(cart)
  nextSpot = cartmap[newCartPos[0]][newCartPos[1]]
  turnCart(nextSpot, cart)
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
        if c["x"] == x and c["y"] == y and (not cartChar == "X"): # X cannot be overwritten
          cartChar = c["c"]
      line += cartChar if cartChar else t
    toPrint += f"{line}\n"
  print(toPrint)

printMap()

def findCollision(carts, curCart):
  for c in carts:
    if curCart == c:
      continue
    if c["x"] == curCart["x"] and c["y"] == curCart["y"]:
      return c
  return None

def getCartKey(cart):
  xPadding = ""
  cartX = cart["x"]
  cartY = cart["y"]
  if cartX < 10:
    xPadding = "00"
  elif cartX < 100:
    xPadding = "0"
  yPadding = ""
  if cartY < 10:
    yPadding = "00"
  elif cartY < 100:
    yPadding = "0"
  return f"{yPadding}{cartY},{xPadding}{cartX}"

firstCollision = None
while len(carts) > 1:
  carts = sorted(carts,key=getCartKey)
  toRemove = []
  for (i,c) in enumerate(carts):
    carts[i] = advanceCart(c)
    collided = findCollision(carts,c)
    if collided:
      if not firstCollision:
        firstCollision = (c["y"], c["x"]) #my X and Y are backwards
      toRemove.append(c)
      toRemove.append(collided)
  for r in toRemove:
    carts.remove(r)
  if (display):
    printMap()
  time.sleep(sleepAmt)

print(f"Location of first collision is {firstCollision}")
cartY = carts[0]["y"]
cartX = carts[0]["x"]
print(f"Location of last cart is ({cartY},{cartX})")