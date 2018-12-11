data = []
with open("day8data") as f:
  rawdata = f.readlines()[0]
  for d in rawdata.split(' '):
    data.append(int(d))

global totalMetadata
totalMetadata = 0

def findNodeAt(i):
  global totalMetadata
  node = {}
  numChildren = data[i]
  node['numChildren'] = numChildren
  i += 1
  numMetadata = data[i]
  node['numMetadata'] = numMetadata
  i += 1
  node['children'] = []
  if numChildren > 0:
    for _ in range(numChildren):
      child = findNodeAt(i)
      node['children'].append(child)
      i = child['endIndex']
  metadata = data[i:i+numMetadata]
  sumMetadata = sum([int(x) for x in metadata])
  totalMetadata += sumMetadata
  node['metadata'] = metadata
  node['endIndex'] = i+numMetadata
  if numChildren == 0:
    node['value'] = sumMetadata
  else:
    node['value'] = 0
    for m in metadata:
      if m > 0 and m <= numChildren:
        node['value'] += node['children'][m-1]['value']
  return node

root = findNodeAt(0)
print(f"Sum of the metadata: {totalMetadata}")
print(f"Root value: {root['value']}")
