$instructions = []
File.open('day18input','r') do |f|
  f.readlines.each do |l|
    $instructions.push(l.split(' '))
  end
end

def getReg(pValue)
  reg = {}
  ('a'...'z').each { |l| reg[l] = 0 }
  reg["p"] = pValue
  return reg
end

def getValue(reg, item)
  if /\d+/.match(item) != nil
    return item.to_i
  else
    return reg[item]
  end
end

$lastSound = nil

def doInst(reg, i, part1)
  i1 = $instructions[i][1]
  i2 = $instructions[i][2]
  newI = nil
  sound = nil
  send = nil
  receive = nil
  case $instructions[i][0]
    when 'snd'
      if part1
        $lastSound = getValue(reg, i1)
      else
        send = getValue(reg, i1)
      end
    when 'set'
      reg[i1] = getValue(reg, i2)
    when 'add'
      reg[i1] = getValue(reg, i1) + getValue(reg, i2)
    when 'mul'
      reg[i1] = getValue(reg, i1) * getValue(reg, i2)
    when 'mod'
      reg[i1] = getValue(reg, i1) % getValue(reg, i2)
    when 'rcv'
      if part1
        if getValue(reg, i1) != 0
          sound = $lastSound
        end
      else
        receive = i1
      end
    when 'jgz'
      if getValue(reg, i1) > 0
        newI = i + getValue(reg, i2)
      end
  end
  if part1
    return [newI, sound]
  else
    return [newI, send, receive]
  end
end

def findSound()
  registers = getReg(0)
  lastSound = nil
  i = 0
  while i < $instructions.length
    res = doInst(registers, i, true)
    if res[0] != nil
      i = res[0]
      next
    elsif res[1] != nil
      #we've found a sound
      return res[1]
    end
    i = i + 1
  end
end

puts "last sound is #{findSound()}"

qs = [[],[]]
regs = [getReg(0), getReg(1)]
waitingOn = [nil, nil]
sendCount = 0
is = [0, 0]
while true
  #repeat for both threads
  (0...2).each do |x|
    if waitingOn[x] and qs[x].length > 0
      regs[x][waitingOn[x]] = qs[x].shift
    end
    while true
      res = doInst(regs[x], is[x], false)
      if res[0] != nil
        is[x] = res[0]
        next
      elsif res[1] != nil
        other = (x+1) % 2
        qs[other].push res[1]
        sendCount = sendCount + 1 if x == 1
      elsif res[2] != nil
        if qs[x].length == 0
          #save the reg and pass control to the other thread
          waitingOn[x] = res[2]
          is[x] = is[x] + 1
          break
        end
        regs[x][res[2]] = qs[x].shift
      end
      is[x] = is[x] + 1
    end
  end
  # at this point both threads are waiting
  if qs[0].length == 0 and qs[1].length == 0
    break 
  end
end
puts "sent #{sendCount} times"
