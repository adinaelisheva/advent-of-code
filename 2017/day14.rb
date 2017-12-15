load 'knothash.rb'
input = 'ffayrhll'

grid = []

sum = 0
(0...128).each do |i|
  key = "#{input}-#{i}"
  hash = hashFn(stringToNums(key))
  row = ''
  hash.each_char do |n|
    binary = n.to_i(16).to_s(2).rjust(4,'0')
    sum = sum + binary.split('').count { |x| x == "1" }
    row = row + binary
  end
  grid.push row
end

puts "#{sum} squares are used."

def getNeighbors(x, y)
  ret = []
  if x > 0
    ret.push([x-1,y])
  end
  if y > 0
    ret.push([x,y-1])
  end
  if x < 127
    ret.push([x+1,y])
  end
  if y < 127
    ret.push([x,y+1])
  end
  return ret
end

regions = 0
(0...128).each do |x|
  (0...128).each do |y|
    if grid[x][y] == "0"
      next
    end
    queue = [[x,y]]
    while queue.length > 0
      coord = queue.pop
      neighbors = getNeighbors(coord[0],coord[1])
      neighbors.each do |n|
        nx = n[0]
        ny = n[1]
        if grid[nx][ny] == "1"
          queue.unshift(n)
        end
        grid[nx][ny] = "0"
      end
    end
    regions = regions + 1
  end
end

puts "there are #{regions} regions"