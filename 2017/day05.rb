text = []
File.open('day5input','r') do |f|
    text = f.readlines
end

def jump(isP2, text)
    maze = text.clone
    pos = 0
    steps = 0
    while(pos < maze.length)
        steps = steps+1
        nextStep = maze[pos].to_i 
        if (isP2 and nextStep >= 3)
            maze[pos] = nextStep - 1
        else
            maze[pos] = nextStep + 1
        end
        pos = pos + nextStep
    end
    return steps
end

puts "first, escaping took #{jump(false, text)} steps"
puts "then it took #{jump(true, text)} steps"
    