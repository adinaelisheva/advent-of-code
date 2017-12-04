input = 368078

def findRingCorners(root, n) 
  s = root + 2 # next biggest odd root
  c1 = n+(s-1)
  c2 = n+2*(s-1)
  c3 = n+3*(s-1)
  c4 = n+4*(s-1)
  return [n,c1,c2,c3,c4] # n is the secret 0th corner
end

# note: I did a bunch of probably unnecessary math here, my notes
# can be found in the accompanying png
def part1(num)
  # this grid is a series of rings ending with odd squares
  # we're gonna find where in the rings num is, checking some
  # special cases along the way

  # first find the smallest odd square below num
  root = Math.sqrt(num).to_i
  root = root % 2 == 1 ? root : root-1
  n = root*root
  return root-1 if (n==num)

  # it's not on the starting corner, so it must be in the ring
  # next find the side length and corners of the ring
  c = findRingCorners(root, n)

  # note that num can't be c4 because that's the next square
  return root+1 if (c[1] == num or c[2] == num or c[3] == num) 

  avg = 0
  if (num < c[1])
    avg = (n + c[1])/2 
  elsif (num < c[2])
    avg = (c[1] + c[2])/2
  elsif (num < c[3])
    avg = (c[2] + c[3])/2
  else
    avg = (c[3] + c[4])/2
  end
  d = (root+1)/2
  return d if num == avg
  return (num - avg).abs + d
end

puts "distance is #{part1(input)}"

def findsum(grid, x, y)
  sum = 0
  (x-1..x+1).each do |i|
    (y-1..y+1).each do |j|
      sum = sum + grid[i][j].to_i
    end
  end
  return sum
end

def pg(grid,i) 
  return if i > 30
  puts "grid for ##{i}"
  s=""
  grid.each do |row|
    row.each do |col|
      c = col ? col : "__"
      s = s + "#{c},\t"
    end
    s = s + "\n"
  end
  puts "#{s}\n\n"
end

def part2(num)
  # for part 2 just generate the grid
  grid = []
  #make it 50x50 i'm sure that's enough
  (0...12).each do |i| 
    grid[i] = []
    grid[i][12] = 0
  end 
  #seed the grid with ring 1
  grid[5][5] = 5
  grid[6][5] = 4
  grid[7][5] = 2
  grid[5][6] = 10
  grid[6][6] = 1
  grid[7][6] = 1
  grid[5][7] = 11
  grid[6][7] = 23
  grid[7][7] = 25

  # start at the beginning of the second ring
  x = 8
  y = 7
  i = 9

  #starting values for first ring
  root = 3

  coord=[x,y]

  while true
    c = findRingCorners(root, i)
    while i < c[1] - 1
      #move up
      sum = findsum(grid,x,y)
      return sum if sum > num
      grid[x][y] = sum
      i = i+1
      y = y-1
    end
    while i < c[2] - 1
      #move left
      sum = findsum(grid, x,y)
      return sum if sum > num
      grid[x][y] = sum
      i = i+1
      x = x-1
    end
    while i < c[3] - 1
      # move down
      sum = findsum(grid, x,y)
      return sum if sum > num
      grid[x][y] = sum
      i = i+1
      y = y+1
    end
    while i < c[4]
      # move right
      sum = findsum(grid, x,y)
      return sum if sum > num
      grid[x][y] = sum
      i = i+1
      x = x+1
    end
    root = root + 2 #next ring
  end
end

puts "biggest num is #{part2(input)}"
