text = ''
File.open('input1a','r') do |f|
  text = f.readlines[0]
end

sum = (text[0] == text[-1]) ? text[0].to_i : 0
(1...text.length).each do |i|
  if (text[i-1] == text[i]) 
    sum = sum + text[i].to_i
  end
end
puts "part 1 sum is #{sum}"

sum = 0
dist = text.length/2
(0...text.length).each do |i|
  i2 = (i + dist) % text.length
  if (text[i] == text[i2]) 
    sum = sum + text[i].to_i
  end
end
puts "part 2 sum is #{sum}"