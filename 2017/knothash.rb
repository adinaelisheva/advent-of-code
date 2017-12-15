$size = 256
$skip = 0
$curpos = 0
$list = []

def hashSetup
  $skip = 0
  $curpos = 0
  $list = []
  (0...$size).each{ |x| $list.push x }  
end

def hashRound(input)
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

def hash(input)
  hashSetup()
  (0...64).each do 
    hashRound(input)
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