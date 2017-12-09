text = ''
File.open('day8input','r') do |f|
  text = f.readlines
end

registers = {}
highest = 0

text.each do |l| 
  #grab the relevant info from the line
  inst = l.split
  reg = inst[0]
  increment = inst[1] == 'inc' ? 1 : -1
  amt = inst[2].to_i
  compreg = inst[4]
  comp = inst[5]
  compamt = inst[6].to_i

  #initalize any needed registers
  if registers[reg] == nil
    registers[reg] = 0
  end
  if registers[compreg] == nil
    registers[compreg] = 0
  end

  compreg = registers[compreg]
  valid = false
  case comp
    when '<'
      valid = compreg < compamt
    when '<='
      valid = compreg <= compamt
    when '>'
      valid = compreg > compamt
    when '>='
      valid = compreg >= compamt
    when '=='
      valid = compreg == compamt
    when '!='
      valid = compreg != compamt
  end
  if valid
    registers[reg] += (increment*amt)
    if registers[reg] > highest
      highest = registers[reg]
    end
  end

end

puts "Largest final value is #{registers.values.max}"
puts "Largest ever value is #{highest}"