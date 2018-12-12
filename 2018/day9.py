from collections import deque 

numPlayers = 423
lastMarble1 = 71944
lastMarble2 = 7194400

# The marbles are in a deque with the "current" one being in position 0
marbles = deque()
marbles.append(0)

def placeMarble(currentMarble):
  marbles.rotate(-2)
  marbles.appendleft(i)

scores = {}
elf = 1
for i in range(1,lastMarble2):
  if i % 23 != 0:
    placeMarble(i)
  else:
    if elf not in scores.keys():
      scores[elf] = 0
    marbles.rotate(7)
    scores[elf] += i + marbles.popleft()

  elf = (elf + 1) % numPlayers
  if i == lastMarble1:
    print(f"Highest score at first is {max(scores.values())}")

print(f"Highest score x100 is {max(scores.values())}")