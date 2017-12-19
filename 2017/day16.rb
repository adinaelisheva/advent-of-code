originalList = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p"]
moves = ''
File.open('day16input','r') do |f|
  moves = f.readlines[0].split(",")
end

def findProgram(name, list)
  list.each_with_index do |p,i| 
    return i if p == name
  end
end

def iteration(moves, list)
  list = list.clone
  moves.each do |item|
    move = item[0]
    details = item[1...item.length]
    case move
      when "s"
        amt = details.to_i
        tail = list[-amt...list.length]
        head = list[0...-amt]
        list = tail + head
      when "x"
        locs = details.split("/")
        a = locs[0].to_i
        b = locs[1].to_i
        tmp = list[a]
        list[a] = list[b]
        list[b] = tmp
      when "p"
        locs = details.split("/")
        i0 = findProgram(locs[0], list)
        i1 = findProgram(locs[1], list)
        list[i0] = locs[1]
        list[i1] = locs[0]
    end
  end
  return list
end
puts "after one iteration, list is #{iteration(moves,originalList).join('')}"

# now find a cycle
cycle = 1
list = originalList.clone
while true
  list = iteration(moves, list)
  break if list.join('') == originalList.join('')
  cycle = cycle + 1
end
puts "cycle is of size #{cycle}"

puts "needs to run #{1000000000 % cycle} times"

list = originalList.clone
(0...16).each do 
  list = iteration(moves, list)
end
puts "final list is #{list.join('')}"