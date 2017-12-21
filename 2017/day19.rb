$grid = []
File.open('day19input','r') do |f|
  f.readlines.each do |l|
    $grid.push l.chop.split('')
  end
end
x = $grid[0].index("|")
y = 0

dir = "U"
path = ""
steps = 0
while true
  spot = $grid[y][x]
  if spot == nil or spot == " "
    #we've reached the end
    break
  end
  if dir == "D" or dir == "U"
    if spot == "+"
      if x == 0 or $grid[y][x-1] == " "
        x = x+1
        dir = "R"
      else
        x = x-1
        dir = "L"
      end
    else
      y = y + (dir == "U" ? 1 : -1)
    end
  elsif dir == "L" or dir == "R"
    if spot == "+"
      if y == 0 or $grid[y-1][x] == " "
        y = y+1
        dir = "U"
      else
        y = y-1
        dir = "D"
      end
    else
      x = x + (dir == "R" ? 1 : -1)
    end
  end
  if /[A-Z]/.match(spot) != nil
    path = path + spot
  end
  steps = steps + 1
end

puts "traveled #{path} in #{steps} steps"
