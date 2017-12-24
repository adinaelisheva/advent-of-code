sum = 0
File.open('day2input','r') do |f|
  f.readlines.each do |l|
    smallest = Float::INFINITY
    largest = 0
    l.split.each do |num|
      if num.to_i < smallest
        smallest = num.to_i
      end
      if num.to_i > largest
        largest = num.to_i
      end
    end
    sum += largest - smallest
  end
end
puts "checksum is #{sum}"

sum = 0
File.open('day2input','r') do |f|
  f.readlines.each do |l|
    l.split.each do |num1|
      l.split.each do |num2|
        div = (num1.to_f/num2.to_f)
        if num1 != num2 and div == div.round
          # it's a good division!
          sum = sum + div.to_i
        end
      end
    end
  end
end
puts "checksum2 is #{sum}"