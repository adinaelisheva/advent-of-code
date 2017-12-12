text = ''
File.open('day11input','r') do |f|
  text = f.readlines[0]
end

x = 0
y = 0
z = 0
furthest = 0
distance = 0

# Many thanks to https://www.redblobgames.com/grids/hexagons/#distances
text.split(",").each do |dir|
  case dir
    when "ne"
      x = x+1
      z = z-1
    when "n"
      y = y+1
      z = z-1
    when "nw"
      y = y+1
      x = x-1
    when "se"
      x = x+1
      y = y-1
    when "s"
      z = z+1
      y = y-1
    when "sw"
      z = z+1
      x = x-1
  end
  distance = ((x.abs + y.abs + z.abs) / 2)
  furthest = [distance, furthest].max
end

puts "the child is #{distance} away"
puts "furthest it got was #{furthest}"
