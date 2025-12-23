function canEscape(maze: string[][]): boolean {
  const mazeWidth = maze[0].length
  const mazeHeight = maze.length

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]

  let S

  // Find S

  let SRow = maze.findIndex(i => i.includes('S'))
  S = [SRow, maze[SRow].indexOf('S')]

  const visited: Set<string> = new Set()
  const stack: number[][] = [S!]

  while (stack.length > 0) {
    let current = stack.pop()!
    if(maze[current[0]][current[1]] === 'E') {
      return true
    }
    visited.add(`${current[0].toString()}-${current[1].toString()}`)

    for(let direction of directions) {
      let next = [current[0] + direction[0], current[1] + direction[1]]

      if(isInside(next) && !visited.has(`${next[0]}-${next[1]}`)) {
        const nextChar = maze[next[0]][next[1]]
        if(nextChar !== '#') {
          stack.push(next)
        }
      }
    }
  }

  return false

  function isInside(point: number[]) {
    const [i, j] = point
    return i >= 0 && j >= 0 && i < mazeHeight && j < mazeWidth
  }
}

console.log(canEscape([
  ['S', '.', '#', '.'],
  ['#', '.', '#', '.'],
  ['.', '.', '.', '.'],
  ['#', '#', '#', 'E']
]))
// → true

console.log(canEscape([
  ['S', '#', '#'],
  ['.', '#', '.'],
  ['.', '#', 'E']
]))
