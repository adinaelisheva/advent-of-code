$tape = {}
$state = 0
$pos = 0

# arrays are [newPos, newState, newValue]
$input = {
  0 => [[1,1,1],[-1,1,0]],
  1 => [[-1,2,1],[1,4,0]],
  2 => [[1,4,1],[-1,3,0]],
  3 => [[-1,0,1],[-1,0,1]],
  4 => [[1,0,0],[1,5,0]],
  5 => [[1,4,1],[1,0,1]]
}

def run(num)
  num.times do |x|
    value = ($tape[$pos] == 1 ? 1 : 0)
    inst = $input[$state][value]
    $tape[$pos] = inst[2]
    $state = inst[1]
    $pos = $pos + inst[0]
  end
end

run(12683008)
puts "Checksum: #{$tape.values.select{|x| x==1}.length}"