type Factory = string[]
type ResultFactory = 'completed' | 'broken' | 'loop'
      
function runFactory(factory: Factory): ResultFactory {
  let position = [0, 0]

  const visited: Set<string> = new Set()

  const movements = {
    '>' : [0, 1],
    '<' : [0, -1],
    '^' : [-1, 0],
    'v' : [1, 0]
  }

  let running = true

  while(running) {
    const key = `${position[0]}${position[1]}`
    if(visited.has(key)) {
      return 'loop'
    }
    visited.add(key)
    let element = factory[position[0]][position[1]]

    if(element === '.') {
      return 'completed'
    }

    const movement = movements[element as keyof typeof movements]
    position = [position[0] + movement[0], position[1] + movement[1]]
    if(position[0] >= factory.length || position[0] < 0 || position[1] >= factory[0].length || position[1] < 0) {
      return 'broken'
    }
  }

  return 'completed'
}

console.log(runFactory([
  '>>.'
])) // 'completed'

console.log(runFactory([
  '>>>'
])) // 'broken'

console.log(runFactory([
  '>><'
])) // 'loop'

console.log(runFactory([
  '>>v',
  '..<'
])) // 'completed'

console.log(runFactory([
  '>>v',
  '<<<'
])) // 'broken'

console.log(runFactory([
  '>v.',
  '^..'
])) // 'completed'

console.log(runFactory([
  'v.',
  '^.'
])) // 'loop'