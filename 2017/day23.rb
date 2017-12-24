$instructions = []
File.open('day23input','r') do |f|
  f.readlines.each do |l|
    $instructions.push(l.split(' '))
  end
end

def getReg()
  reg = {}
  ('a'...'h').each { |l| reg[l] = 0 }
  return reg
end

def getValue(reg, item)
  if /\d+/.match(item) != nil
    return item.to_i
  else
    return reg[item]
  end
end

def doInst(reg, i)
  i1 = $instructions[i][1]
  i2 = $instructions[i][2]
  newI = nil
  case $instructions[i][0]
    when 'set'
      reg[i1] = getValue(reg, i2)
    when 'sub'
      reg[i1] = getValue(reg, i1) - getValue(reg, i2)
    when 'mul'
      $count = $count + 1
      reg[i1] = getValue(reg, i1) * getValue(reg, i2)
    when 'jnz'
      if getValue(reg, i1) != 0
        newI = i + getValue(reg, i2)
      end
  end
  return newI
end

def part1()
  registers = getReg()
  i = 0
  while i < $instructions.length
    res = doInst(registers, i)
    if res != nil
      i = res
      next
    end
    i = i + 1
  end
end

$count = 0  
part1()
puts "mul called #{$count} times"

#part 2 - i turned the code into actual ruby
c = 123700
count = 0

def isComposite(b)
  limit = (b/2).ceil
  (2...limit).each do |d|
    return true if b % d == 0
  end
  return false
end

106700.step(c, 17).each do |b|
  count = count + 1 if isComposite(b)
end
puts "output of program is #{count}"