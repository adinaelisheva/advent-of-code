connections = {}
File.open('day12input','r') do |f|
  f.readlines.each do |l|
    l = l.gsub(' ','').strip
    parts = l.split('<->')
    input = parts[0]
    outputs = parts[1].split(',')
    connections[input] = outputs
  end
end

groupcount = 0
zerosize = 0
seen = {}

(0...2000).each do |n|
  nstr = "#{n}"
  if seen[nstr]
    next
  end
  queue = [nstr]
  while queue.length > 0
    connections[queue.pop].each do |item|
      if !seen[item]
        seen[item] = true
        queue.unshift(item)
      end
    end
  end
  if groupcount == 0
    # save the size of the 0 group
    zerosize = seen.keys.length
  end
  groupcount = groupcount + 1
end

puts "items in group 0: #{zerosize}"
puts "total groups: #{groupcount}"