lines = None
with open("day4data") as f:
  lines = f.readlines()

newlines = []
for line in lines:
  # commence not very smart text parsing
  newlines.append(line[6:]
          .replace("falls asleep", "s")
          .replace("wakes up", "w")
          .replace("Guard #","")
          .replace(" begins shift","")
          .replace("]", "")
          .strip())

def compareTimes(a):
  return a[:12]
  
lines = sorted(newlines, key=compareTimes)

lastsleep = 0
curguard = 0
sleeps = {}

for line in lines:
  data = line.split(" ")
  keyword = data[2]
  minute = int(data[1].split(":")[1])
  if (keyword == "s"):
    lastsleep = minute
  elif (keyword == "w"):
    sleeps[curguard]["total"] += minute - lastsleep
    for i in range(lastsleep, minute):
      if i in sleeps[curguard].keys():
        sleeps[curguard][i] += 1
      else:
        sleeps[curguard][i] = 1
  else:
    curguard = keyword
    if not curguard in sleeps.keys():
      sleeps[curguard] = {
        "total": 0
      }

maxGuard = 0
maxGuardSleep = 0
for guard in sleeps.keys():
  if sleeps[guard]["total"] > maxGuardSleep:
    maxGuard = guard
    maxGuardSleep = sleeps[guard]["total"]

maxSleepData = sleeps[maxGuard]
maxMinuteAmt = 0
maxMinute = 0
for d in maxSleepData.keys():
  if d == "total":
    continue
  amt = maxSleepData[d]
  if amt > maxMinuteAmt:
    maxMinuteAmt = amt
    maxMinute = d

print(f"Guard {maxGuard} slept the most, and slept most at minute {maxMinute}")
print(f"Multiplied is: {int(maxGuard) * int(maxMinute)}")

#part 2
maxMinuteAmt = 0
maxMinute = 0
maxGuard = 0
for g in sleeps.keys():
  sleepData = sleeps[g]
  for d in sleepData.keys():
    if d == "total":
      continue
    amt = sleepData[d]
    if amt > maxMinuteAmt:
      maxMinuteAmt = amt
      maxMinute = d
      maxGuard = g
print(f"Guard {maxGuard} slept the most, and slept most at minute {maxMinute}")
print(f"Multiplied is: {int(maxGuard) * int(maxMinute)}")
