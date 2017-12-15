load 'knothash.rb'

input = "94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243"

hashSetup()
p1 = hashRound(input.split(','))
puts "first round product is #{p1[0] * p1[1]}"

puts "final hash is #{hashFn(stringToNums(input))}"