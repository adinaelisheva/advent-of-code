input = [4,10,4,1,8,4,9,14,5,1,14,15,0,15,3,5]

def findMaxIndex(arr) 
  max = 0
  maxdex = 0
  arr.each_with_index do |num, i|
    if num > max
      max = num
      maxdex = i
    end
  end
  return maxdex
end

seen = {}
banks = input.clone
steps = 0
key = banks.join('|')
while (!seen[key])
  seen[key] = steps
  steps = steps + 1
  ind = findMaxIndex(banks)
  amt = banks[ind]
  banks[ind] = 0
  ind = (ind + 1) % banks.length
  while amt > 0
    banks[ind] = banks[ind] + 1
    ind = (ind + 1) % banks.length
    amt = amt - 1
  end
  key = banks.join('|')
end
puts "it took #{steps} steps from the beginning, with #{steps - seen[key]} steps in the cycle"