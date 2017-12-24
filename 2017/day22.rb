$NORTH = 0
$EAST = 1
$SOUTH = 2
$WEST = 3

$X = 0
$Y = 1
$DIR = 2

$CLEAN = 0
$WEAKENED = 1
$INFECTED = 2
$FLAGGED = 3

$ant = []
$grid = {}

def setup(p2 = false)
  $grid = {}
  #copy in the start grid, which is 25x25, so ant starts at 12,12
  File.open('day22input','r') do |f|
    f.readlines.each_with_index do |l,j|
      l.each_char.with_index do |c,i|
        if p2
          $grid["#{i},#{j}"] = (c == "#" ? $INFECTED : $CLEAN)
        else
          $grid["#{i},#{j}"] = c == "#"
        end
      end
    end
  end
  $ant = [12,12,$NORTH] #x, y, dir
end

def rotateAnt(amt) 
  $ant[$DIR] = ($ant[$DIR] + amt) % 4
end

def updateStatus(status)
  return (status+1) % 4
end

def moveAnt()
  case $ant[$DIR]
    when $NORTH
      $ant[$Y] = $ant[$Y] - 1
    when $SOUTH
      $ant[$Y] = $ant[$Y] + 1
    when $EAST
      $ant[$X] = $ant[$X] + 1
    when $WEST
      $ant[$X] = $ant[$X] - 1
  end
end

def part1()
  ret = false
  key = "#{$ant[$X]},#{$ant[$Y]}"
  amt = $grid[key] ? 1 : -1
  if !$grid[key]
    #this is gonna become infected
    ret = true
  end
  $grid[key] = !$grid[key]
  rotateAnt(amt)
  moveAnt()
  return ret
end

def part2()
  ret = false
  key = "#{$ant[$X]},#{$ant[$Y]}"
  amt = 0
  case $grid[key]
    when $CLEAN
      amt = -1
    when $INFECTED
      amt = 1
    when $FLAGGED
      amt = 2
    when $WEAKENED
      #this is gonna become infected
      ret = true
    when nil
      $grid[key] = $CLEAN
      amt = -1
  end
  $grid[key] = updateStatus($grid[key])
  rotateAnt(amt)
  moveAnt()
  return ret
end

setup()
count = 0
10000.times do |x|
  count = count + 1 if part1()
end
puts "initial virus infects #{count} cells"
setup(true)
count = 0
10000000.times do |x|
  count = count + 1 if part2()
end
puts "evolved virus infects #{count} cells"
