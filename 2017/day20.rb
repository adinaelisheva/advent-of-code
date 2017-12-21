$input = nil
File.open('day20input','r') do |f|
  $input = f.readlines
end

def getParticleList()
  ret = []
  $input.each do |l|
    ret.push(l.strip
                .gsub(/ ?.=/,'')
                .gsub(/>/,'')
                .split("<")[1...4]
                .map{|x| x.split(',').map{|y| y.to_i}})
  end
  return ret
end

untouchedList = getParticleList()
particleList = getParticleList()

def sumProp(particle, prop, square = false)
  a = particle[prop][0].abs
  b = particle[prop][1].abs
  c = particle[prop][2].abs
  if square
    return a*a + b*b + c*c
  else
    return a + b + c
  end
end
def findMins(particles, prop, square = false)
  props = particles.map{|x| sumProp(x,prop,square) }
  min = props.min
  return particles.select{|x| sumProp(x,prop,square) == min}
end

winners = findMins(particleList, 2, true)
if winners.length > 1
  winners = findMins(winners, 1)
end
windex = particleList.index(winners[0])
puts "at index #{windex}, winner is:"
p untouchedList[windex]

# part 2 - iterate until the list hasn't changed length for 1000 ticks, close enough
length = particleList.length
unchanged = 0
ticks = 1000
while true
  particleList.each do |p|
    acc = p[2]
    vel = p[1]
    pos = p[0]
    (0...3).each do |x|
      vel[x] = vel[x] + acc[x]
      pos[x] = pos[x] + vel[x]
    end
  end

  #eliminate any collisions
  seen = {}
  todelete = []
  particleList.each_with_index do |p|
    pos = p[0]
    if seen[pos]
      #collision
      todelete = todelete + particleList.select{|d| d[0] == pos}
    else
      seen[pos] = true
    end
  end
  todelete.each do |p|
    particleList.delete(p)
  end
  if length == particleList.length
    unchanged = unchanged + 1
  else
    unchanged = 0
    length = particleList.length
  end
  if unchanged > ticks
    break
  end
end
puts "after all collisions, #{particleList.length} particles are left"