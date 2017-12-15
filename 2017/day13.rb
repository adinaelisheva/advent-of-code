firewall = []
File.open('day13input','r') do |f|
  f.readlines.each do |l|
    info = l.gsub(' ','').strip.split(':')
    pos = info[0].to_i
    firewall[pos] = info[1].to_i
  end
end

def run(firewall, delay)
  isPart2 = delay != false
  severity = 0
  (0...firewall.length).each do |pos|
    time = pos
    if isPart2
      time = time + delay
    end
    d = firewall[pos]
    if d == nil
      next
    end
    cyclepos = time % ((d-1)*2)
    if cyclepos == 0
      if isPart2
        return false
      else
        severity = severity + (pos * d)
      end
    end
  end
  if isPart2
    return true
  else
    return severity
  end
end

puts "severity is #{run(firewall,false)}"

#this is probably enough 
(0...10000000000).each do |i|
  success = run(firewall,i)
  if success != false
    puts "shortest delay is #{i}"
    exit
  end
end