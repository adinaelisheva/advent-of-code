lines = None
with open("day3data") as f:
  lines = f.readlines()
claims = {}
for line in lines:
  data = (line
    .strip()
    .replace(" ","")
    .replace("#","")
    .replace("@"," ")
    .replace(","," ")
    .replace("x"," ")
    .replace(":"," ")
    .split(" "))
  claims[data[0]] = {
    "x": int(data[1]),
    "y": int(data[2]),
    "w": int(data[3]),
    "h": int(data[4])
  }

doubleclaimed = 0
seen = {}
doubleseen = {}
for k,claim in claims.items():
  for i in range(claim["x"], claim["x"] + claim["w"]):
    for j in range(claim["y"], claim["y"] + claim["h"]):
      coord = f"{i},{j}"
      if coord in seen.keys():
        if not coord in doubleseen.keys():
          doubleclaimed += 1
        doubleseen[coord] = True
      seen[coord] = True

print(f"{doubleclaimed} locations are claimed more than once")