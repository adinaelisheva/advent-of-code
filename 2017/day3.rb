input = 368078

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
  #next find the side length and corners of the ring
  s = root + 2 #next biggest odd root
  c1 = n+(s-1)
  c2 = n+2*(s-1)
  c3 = n+3*(s-1)
  c4 = n+4*(s-1)

  # note that num can't be c4 because that's the next square
  return root+1 if (c1 == num or c2 == num or c3 == num) 

  avg = 0
  if (num < c1)
    avg = (n + c1)/2 #n is the secret 0th corner
  elsif (num < c2)
    avg = (c1 + c2)/2
  elsif (num < c3)
    avg = (c2 + c3)/2
  else
    avg = (c3 + c4)/2
  end
  d = (root+1)/2
  return d if num == avg
  return (num - avg).abs + d
end

puts "distance is #{part1(input)}"