stepAmt = 363

pos = 0
buffer = [0]
(1...2018).each do |i|
  pos = (pos + stepAmt + 1) % buffer.length
  buffer = buffer[0...pos] + [i] + buffer[pos...buffer.length]
end
pos = (pos + 1) % buffer.length
puts "after last insertion is #{buffer[pos]}"

# now figure out the 50 million case
pos = 0
postZero = nil
length = 1
pos = 0
(0...50000000).each do
  pos = (pos + stepAmt) % length
  if pos == 0
    postZero = length
  end
  length = length + 1
  pos = (pos + 1) % length
end
puts "after 0 is #{postZero}"