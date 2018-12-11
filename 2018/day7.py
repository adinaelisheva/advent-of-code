lines = None
with open("day7data") as f:
  lines = f.readlines()

parents = {}

allsteps = set()
rules = []
for line in lines:
  line = line.replace("Step ","").replace(" must be finished before step ",",").replace(" can begin.","")
  parts = line.split(",")
  first = parts[0].strip()
  second = parts[1].strip()
  
  allsteps.add(first)
  allsteps.add(second)

  rules.append([first, second])

def setupParents():
  parents = {}
  for rule in rules:
    first = rule[0]
    second = rule[1]
    if second in parents.keys():
      parents[second].append(first)
    else:
      parents[second] = [first]
  return parents

def findAvailableSteps(workers):
  ret = []
  for step in allsteps:
    if (not step in parents.keys() or parents[step] == []) and (not step in orderedSteps) and (not step in workers):
      ret.append(step)
  ret.sort(reverse=True)
  return ret

def finishTask(finished):
  orderedSteps.append(finished)
  for step in parents.keys():
    if parents[step] and finished in parents[step]:
      parents[step].remove(finished)

# Part 1
parents = setupParents()
orderedSteps = []
availableSteps = findAvailableSteps([])
while len(availableSteps) > 0:
  finishTask(availableSteps.pop())
  availableSteps = findAvailableSteps([])

stepString = "".join(orderedSteps)
print(f"The task order is {stepString}")

# Part 2
parents = setupParents()
orderedSteps = []
availableSteps = findAvailableSteps([])
workers = [None, None, None, None, None]

def getNextAvailableWorker():
  for i in range(5):
    if workers[i] == None:
      return i
  return -1

def isSomeoneWorking():
  for i in range(5):
    if workers[i] != None:
      return True
  return False

def getNextTask(availableSteps):
  if len(availableSteps) > 0:
    return availableSteps.pop()

timeWorked = {}
clock = 0

while len(availableSteps) > 0 or isSomeoneWorking():  
  nextTask = getNextTask(availableSteps)
  w = getNextAvailableWorker()
  while w >= 0 and nextTask:
    workers[w] = nextTask
    nextTask = getNextTask(availableSteps)
    w = getNextAvailableWorker()
  
  clock += 1
  for i in range(len(workers)):
    task = workers[i]
    if task == None:
      continue
    if task in timeWorked.keys():
      timeWorked[task] += 1
    else:
      timeWorked[task] = 1
    if timeWorked[task] == ord(task) - 4:
      #task is done!
      workers[i] = None
      finishTask(task)
  availableSteps = findAvailableSteps(workers)

stepString = "".join(orderedSteps)
print(f"With help, this takes {clock} seconds")
