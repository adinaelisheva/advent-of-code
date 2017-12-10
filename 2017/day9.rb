text = ''
File.open('day9input','r') do |f|
  text = f.readlines[0]
end

currentlevel = 0
score = 0
skipstep = false
garbage = false
garbagecount = 0

text.each_char do |c|
  if skipstep
    skipstep = false
    next
  end
  if garbage and c != '>' and c != '!'
    garbagecount = garbagecount + 1
    next
  end
  case c
    when "!"
      skipstep = true
    when "<"
      garbage = true
    when ">"
      garbage = false
    when "{"
      currentlevel = currentlevel + 1
    when "}"
      score = score + currentlevel
      currentlevel = currentlevel - 1
  end

end

puts "score is #{score}"
puts "garbage removed: #{garbagecount}"