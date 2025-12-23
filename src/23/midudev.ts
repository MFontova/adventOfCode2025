function minStepsToDeliver(map: string[][]): number {
  const mapHeight = map.length
  const mapWidth = map[0].length

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ]

  let steps = 0
  let reachedGs = 0

  let S
  // Find S
  let SRow = map.findIndex(i => i.includes('S'))
  S = [SRow, map[SRow].indexOf('S')]

  let numberOfGifts = 0
  for (let index = 0; index < map.length; index++) {
    const line = map[index];
    numberOfGifts += line.filter(element => element === 'G').length
  }

  if(numberOfGifts === 0) return 0

  console.log('numberOfGifts', numberOfGifts)

  const queue: number[][] = [[...S, 0]]
  const visited: Set<string> = new Set()
  
  visited.add(`${S[0]}-${S[1]}`)

  while (queue.length > 0) {
    let [x, y, w] = queue.shift()!

    if(map[x][y] === 'G') {
      steps += w
      reachedGs += 1
    }

    for(let direction of directions) {
      let next = [x + direction[0], y + direction[1]]

      if(isInside(next) && !visited.has(`${next[0]}-${next[1]}`)) {
        const nextChar = map[next[0]][next[1]]
        if(nextChar !== '#') {
          visited.add(`${next[0]}-${next[1]}`)
          queue.push([...next, w + 1])
        }
      }
    }
  }

  console.log('reachedGs', reachedGs)

  if(reachedGs < numberOfGifts) return -1
  return steps

  function isInside(point: number[]) {
    const [i, j] = point
    return i >= 0 && j >= 0 && i < mapHeight && j < mapWidth
  }
}

// console.log(minStepsToDeliver([
//   ['S', '.', 'G'],
//   ['.', '#', '.'],
//   ['G', '.', '.']
// ]))

// console.log(minStepsToDeliver([
//   ['S', '#', 'G'],
//   ['#', '#', '.'],
//   ['G', '.', '.']
// ]))

// console.log(minStepsToDeliver([
//   ['S', 'G', 'G'],
//   ['.', '#', '#'],
//   ['.', 'G', '.']
// ]))

console.log(minStepsToDeliver([
  ['S', '.', 'G', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', 'G', '.']
]))

// const map = [
//   ['G', '#', 'G'],
//   ['.', 'S', '.'],
//   ['.', '.', '.']
// ]

// console.log(minStepsToDeliver(map));


// console.log(minStepsToDeliver([['S', 'G']]))