text = ''
File.open('day7input','r') do |f|
  text = f.readlines
end

class Treenode
  @parent = nil
  @calculatedWeight = nil
  attr_accessor :title
  attr_accessor :weight
  attr_accessor :parent
  attr_accessor :children

  def initialize(title, weight, children)
    @title = title
    @weight = weight.to_i
    @children = children
  end

  def findUnbalanced
    # first check if the children are unbalanced (to short circuit out
    # if we've already found the bad one)
    @children.each do |c|
      ans = c.findUnbalanced
      if ans != true
        return ans
      end
    end
    nodeweights = {}
    weightcounts = {}
    if @children.length <= 2
      return true
    end
    @children.each do |c|
      w = c.calculateWeight
      nodeweights[w] = c
      if weightcounts[w]
        weightcounts[w] = weightcounts[w] + 1
      else
        weightcounts[w] = 1
      end 
    end
    badweight = nil
    goodweight = nil
    weightcounts.each do |weight, count|
      if count == 1
        badweight = weight
      else
        goodweight = weight
      end
    end
    if badweight != nil
      node = nodeweights[badweight]
      return (goodweight - badweight) + node.weight
    end
    return true
  end

  def calculateWeight
    if @calculatedWeight == nil
      sum = 0
      children.each do |c|
        sum = sum + c.calculateWeight
      end
      @calculatedWeight = sum + @weight
    end
    return @calculatedWeight
  end
end

nodemap = {}

text.each do |l|
  data = l.gsub(/ |-|>/,'').gsub(/\(|\)/,',').strip.split(',')
  title = data[0]
  weight = data[1]
  children = data[2...data.length]
  newnode = Treenode.new(title, weight, children)
  nodemap[title] = newnode
end

nodemap.each do |k,v|
  newchildren = []
  v.children.each do |c|
    child = nodemap[c]
    child.parent = v
    newchildren.push child
  end
  v.children = newchildren
end

root = nodemap.values[0]
while root.parent != nil
  root = root.parent
end
puts "root is named #{root.title}"

puts "unbalanced node should weight #{root.findUnbalanced}"