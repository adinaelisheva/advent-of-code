$input = "94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243"
$size = 256
$skip = 0
$curpos = 0
$list = []

def setup
  $skip = 0
  $curpos = 0
  $list = []
  (0...$size).each{ |x| $list.push x }  
end

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

def round(input)
  input.each do |item|
    item = item.to_i
    # sublist x in a circular array of y will have 2 slice points
    # option 1: [yyyy*xxxx^yyyy]
    # option 2: [xxxx^yyyyy*xxx]
    # * is $curpos, ^ is $curpos + item % $size
    endslice = ($curpos + item) % $size
    sublist = []
    if endslice < $curpos
      sublist = $list[$curpos...$size] + $list[0...endslice]
    else
      sublist = $list[$curpos...endslice]
    end
    sublist = sublist.reverse
    #now add it back in
    if endslice < $curpos
      midindex = $size - $curpos
      $list[$curpos...$size] = sublist[0...midindex]
      $list[0...endslice] = sublist[midindex...$size]
    else
      $list[$curpos...endslice] = sublist
    end
    $curpos = ($curpos + $skip + item) % $size
    $skip = $skip + 1
  end
  return $list
end

#part 1
setup()
p1 = round(getInput(false))
puts "first round product is #{p1[0] * p1[1]}"

#reset and then run 64 times for part 2
def p2()
  setup()
  input = getInput(true)
  (0...64).each do 
    round(input)
  end
  i = 0
  densehash = []
  (0...16).each do
    xor = $list[i]
    $list[i+1...i+16].each do |l|
      xor = xor ^ l
    end
    densehash.push xor
    i = i + 16
  end
  ans = ""
  densehash.each do |d|
    hex = d.to_s(16)
    hex = hex.length == 2 ? hex : '0' + hex
    ans = ans + hex
  end
  return ans
end
puts "final hash is #{p2()}"