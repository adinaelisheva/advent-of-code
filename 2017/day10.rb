load 'knothash.rb'

$input = "94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243"

def getInput(part2)
  if part2
    ret = []
    $input.each_char do |c|
      ret.push c.ord
    end
    return ret + [17, 31, 73, 47, 23]
  else
    return $input.split(',')
  end
end

#part 1
hashSetup()
p1 = hashRound(getInput(false))
puts "first round product is #{p1[0] * p1[1]}"

puts "final hash is #{hash(getInput(true))}"