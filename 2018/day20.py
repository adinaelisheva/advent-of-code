regex = None
with open("day20data") as f:
  regex = f.readlines()[0]

regex = regex[1:len(regex)-1]

class Room:
  def __init__(self, x, y):
    self.x = x
    self.y = y
    self.topdoor = None
    self.leftdoor = None
    self.bottomdoor = None
    self.rightdoor = None

def expand(path):
  pre = ""
  post = ""
  part1 = ""
  part2 = ""
  state = "pre"
  parenDepth = 0

  for c in path:
    if state == "pre":
      if c != "(":
        pre += c
      else:
        parenDepth += 1
        state = "part1"
    elif state == "part1":
      if c == "(":
        part1 += c
        parenDepth += 1
      elif c == ")":
        part1 += c
        parenDepth -= 1
      elif c == "|" and parenDepth == 1:
        state = "part2"
      else:
        part1 += c
    elif state == "part2":
      if c == "(":
        part2 += c
        parenDepth += 1
      elif c == ")":
        parenDepth -= 1
        if parenDepth == 0:
          state = "post"
        else:
          part2 += c
      else:
        part2 += c
    elif state=="post":
      post += c

  return [pre + part1 + post, pre + part2 + post]


#Expand the regex into all possible paths
toExpand = [regex]
paths = []
while len(toExpand) > 0:  
  path = toExpand.pop()
  expanded = expand(path)
  for e in expanded:
    if "(" not in e:
      paths.append(e)
    else:
      toExpand.append(e)
  print("------")
  print(len(paths))
  print(len(toExpand))

for p in paths:
  print(p)