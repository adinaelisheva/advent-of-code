scoreSequence = "074501"
numRecipes = int(scoreSequence)

scores = [3,7]
elf1 = 0
elf2 = 1
initialScore = None
seqFound = None
seqLength = len(scoreSequence)

while True:
  sumScores = scores[elf1] + scores[elf2]
  digits = list(f"{sumScores}")
  for d in digits:
    scores.append(int(d))
    length = len(scores)

    if not seqFound and length > seqLength:
      subSeq = "".join([str(i) for i in scores[-seqLength:]])
      if subSeq == scoreSequence:
        seqFound = length - seqLength
  
  elf1 = (elf1 + scores[elf1] + 1) % length
  elf2 = (elf2 + scores[elf2] + 1) % length

  if length >= numRecipes + 10 and not initialScore:
    initialScore = ("".join([str(i) for i in scores[numRecipes:]]))
    
  if initialScore and seqFound:
    break

print(f"Scores after {numRecipes} attempts: {initialScore}")
print(f"Sequence {scoreSequence} found after {seqFound} recipes")