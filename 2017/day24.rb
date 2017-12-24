$componentMap = {}
File.open('day24input','r') do |f|
  f.readlines.each do |l|
    l.split("/").each do |comp|
      comp = comp.chomp.to_i
      $componentMap[comp] = [] if $componentMap[comp] == nil
      $componentMap[comp].push(l.chomp)
    end
  end
end

$maxStr = 0
$maxBridge = []

def getNexts(curr, bridge)  
  nexts = $componentMap[curr]
  if nexts == nil
    return []
  end
  return nexts.select{ |x|
    bridge.index(x) == nil and bridge.index(x.split("/").reverse.join("/")) == nil
  }
end

def findStrength(bridge)
  strength = 0
  bridge.each do |comp|
    parts = comp.split("/")
    strength = strength + parts[0].to_i + parts[1].to_i
  end
  return strength
end

def build(curr, bridge)
  nexts = getNexts(curr, bridge)
  nexts.each do |n|
    parts = n.split("/")
    openSide = parts[0].to_i == curr ? parts[1].to_i : parts[0].to_i
    build(openSide, bridge + [n])
  end
  if nexts.length == 0
    #nothing left to add
    strength = findStrength(bridge)
    if strength > $maxStr
      $maxStr = strength
    end
    if bridge.length > $maxBridge.length
      $maxBridge = bridge
    elsif bridge.length == $maxBridge.length
      #this is repeating work but idc
      $maxBridge = bridge if strength > findStrength($maxBridge)
    end
  end
end

build(0, [])
puts "maximum strength bridge is #{$maxStr}"
puts "longest bridge is strength #{findStrength($maxBridge)}"