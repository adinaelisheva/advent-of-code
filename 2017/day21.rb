def flip(orig)
  return orig.reverse
end

def rotate(grid)
  res = []
  grid.length.times do res.push([]) end
  grid.each do |y|
    y.each_with_index do |x, i|      
      res[i].unshift(x)
    end
  end
  return res
end

def getAllOrientations(orig)
  a = rotate(orig)
  b = rotate(a)
  c = rotate(b)
  return [orig, a, b, c, flip(orig), flip(a), flip(b), flip(c)].uniq
end

def splitGrid(grid)
  origSize = grid[0].length
  size = 2
  if origSize % 2 != 0
    size = 3
  end
  res = []
  numGrids = origSize / size
  (0...numGrids).each do |rd|
    (0...numGrids).each do |cd|
      newgrid = []
      (rd*size...(rd+1)*size).each do |x|
        row = []
        (cd*size...(cd+1)*size).each do |y|
          row.push(grid[x][y])
        end
        newgrid.push(row)
      end
      res.push(newgrid)
    end
  end      
  return res
end

def stitchGrid(grid)
  gridsPerRow = Math.sqrt(grid.length).to_i
  gridSize = grid[0][0].length
  newSize = gridsPerRow * gridSize
  res = []
  (0...newSize).each do |x|
    row = []
    (0...newSize).each do |y|
      miniGridX = x / gridSize
      miniGridY = y / gridSize
      xInGrid = x % gridSize
      yInGrid = y % gridSize
      miniGrid = grid[miniGridX*gridsPerRow + miniGridY]
      row.push(miniGrid[xInGrid][yInGrid])
    end
    res.push(row)
  end
  return res
end

input = [[false,true,false],[false,false,true],[true,true,true]]

def convertStrToGrid(str)
  ret = []
  str.split("/").each do |r|
    row = []
    r.each_char do |l|
      row.push(l == "#")
    end
    ret.push(row)
  end
  return ret
end

$enhancements = {}
File.open('day21input','r') do |f|
  f.readlines.each do |l|
    rule = l.gsub(/\s/,'').split("=>")
    lhs = convertStrToGrid(rule[0])
    rhs = convertStrToGrid(rule[1])
    getAllOrientations(lhs).each do |e|
      $enhancements[e] = rhs
    end
  end
end

def iterate(input, num)
  ret = input.clone
  num.times do |x|
    puts x
    newGrid = []
    parts = splitGrid(ret)
    parts.each do |p|
      newGrid.push($enhancements[p])
    end
    ret = stitchGrid(newGrid)
  end
  return ret
end

res = iterate(input, 5)
puts "After 5 iterations, #{res.flatten.count{|x| x}} are on"
res = iterate(input, 18)
puts "After 18 iterations, #{res.flatten.count{|x| x}} are on"
