global program
global ipLocation
ipLocation = None
program = []
with open("day19data") as f:
  lines = f.readlines()
  l = lines.pop(0)
  ipLocation = int(l[4])
  for l in lines:
    arr = l.strip().split(" ")
    program.append([arr.pop(0)] + [int(x) for x in arr])

def runProgram(registers):
  ip = 0
  i = 0
  while ip >= 0 and ip < len(program):
    registers[ipLocation] = ip
    step = program[ip]

    # now run the program
    op = step[0]
    arg1 = step[1]
    arg2 = step[2]
    out = step[3]
    if op == "addr":
      registers[out] = registers[arg1] + registers[arg2]
    if op == "addi":
      registers[out] = registers[arg1] + arg2
    if op == "mulr":
      registers[out] = registers[arg1] * registers[arg2]
    if op == "muli":
      registers[out] = registers[arg1] * arg2
    if op == "banr":
      registers[out] = registers[arg1] & registers[arg2]
    if op == "bani":
      registers[out] = registers[arg1] & arg2
    if op == "borr":
      registers[out] = registers[arg1] | registers[arg2]
    if op == "bori":
      registers[out] = registers[arg1] | arg2
    if op == "setr":
      registers[out] = registers[arg1]
    if op == "seti":
      registers[out] = arg1
    if op == "gtir":
      registers[out] = 1 if arg1 > registers[arg2] else 0
    if op == "gtri":
      registers[out] = 1 if registers[arg1] > arg2 else 0
    if op == "gtrr":
      registers[out] = 1 if registers[arg1] > registers[arg2] else 0
    if op == "eqir":
      registers[out] = 1 if arg1 == registers[arg2] else 0
    if op == "eqri":
      registers[out] = 1 if registers[arg1] == arg2 else 0
    if op == "eqrr":
      registers[out] = 1 if registers[arg1] == registers[arg2] else 0
    
    # get the next step
    ip = registers[ipLocation] + 1
    i += 1
    if i % 100000 == 0:
      print(f"Generation {i}:")
      print(registers)
  
  return registers

registers1 = runProgram([0,0,0,0,0,0])
registers2 = runProgram([1,0,0,0,0,0])
print(f"With a 0 ip: {registers1}")
print(f"With a 1 ip: {registers2}")