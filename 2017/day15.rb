factorA = 16807
factorB = 48271
dividend = 2147483647
a = 65#277
b = 8921#349

def compare(a,b)
  return (a & 0xffff) == (b & 0xffff) ? 1 : 0    
end

count = 0
(1...40000000).each do |d|
  a = (a * factorA) % dividend
  b = (b * factorB) % dividend
  count = count + compare(a,b)
end

puts "judge's count is #{count}"

count = 0
a = 277
b = 349
as = []
bs = []
compared = 0
while compared < 5000000
  a = (a * factorA) % dividend
  if a % 4 == 0
    as.push(a)
  end
  b = (b * factorB) % dividend
  if b % 8 == 0
    bs.push(b)
  end
  if as.length > 0 and bs.length > 0
    compared = compared + 1
    count = count + compare(as.shift, bs.shift)
  end
end

puts "second count is #{count}"