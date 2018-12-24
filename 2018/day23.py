import re

class Bot:
  def __init__(self, x, y, z, r):
    self.x = x
    self.y = y
    self.z = z
    self.r = r
  
  def __str__(self):
    return f"R {self.r} ({self.x}, {self.y}, {self.z})"

global bots
bots = []
maxR = 0
maxBot = None
with open("day23data") as f:
  for line in f.readlines():
    match = re.search(r"pos=<(-?\d+),(-?\d+),(-?\d+)>, r=(\d+)", line.strip())
    bot = Bot(
      int(match.group(1)), 
      int(match.group(2)), 
      int(match.group(3)), 
      int(match.group(4)))
    bots.append(bot)
    if bot.r > maxR:
      maxR = bot.r
      maxBot = bot

def countInRange(x,y,z,r=None):
  inRange = 0
  for b in bots:
    dist = abs(b.x - x) + abs(b.y - y) + abs(b.z - z)  
    radius = r if r else bot.r
    if dist <= radius:
      inRange += 1
  return inRange

print(f"{countInRange(maxBot.x, maxBot.y, maxBot.z, maxBot.r)} robots are in range of maxBot")

ranges = {}
for i in range(1,100):
  for j in range(1,100):
    for k in range(1,100):
      ranges[(i,j,k)] = countInRange(i,j,k)

print(ranges)