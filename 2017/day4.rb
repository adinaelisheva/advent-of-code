valid1 = 0
valid2 = 0
File.open('day4input','r') do |f|
  f.readlines.each do |l|
    words = l.split()
    valid1 = valid1 + 1 if words.length == words.uniq.length
    words.map! { |x| x.split('').sort().join('') }
    valid2 = valid2 + 1 if words.length == words.uniq.length
  end
end
puts "#{valid1} passphrases are valid at first, and #{valid2} later"

