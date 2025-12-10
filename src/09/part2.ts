import { getInput } from "../file_reader"

function biggestRectangle() {
  const rawInput = getInput('09', true)

  const redTiles = rawInput.split('\r\n').map(row => row.split(',').map(i => Number(i)))

  // console.log(redTiles)

  let totalTiles = new Set(redTiles.map(t => t.join('-')))

  // First to last movement
  const first = redTiles[0]
  const last = redTiles[redTiles.length - 1]

  const movement = [ last[0] - first[0], last[1] - first[1] ]

  const [mc, mr] = movement

  if(mc === 0 && mr > 0) {
    for (let r = 1; r < mr; r++) {
      const nextTile = [ first[0], first[1] + r ]
      totalTiles.add(nextTile.join('-'))
    }
  }
  if(mr === 0 && mc > 0) {
    for (let c = 1; c < mc; c++) {
      const nextTile = [ first[0] + c, first[1] ]
      totalTiles.add(nextTile.join('-'))
    }
  }
  if(mc === 0 && mr < 0) {
    for (let r = -1; r > mr; r--) {
      const nextTile = [ first[0], first[1] + r ]
      totalTiles.add(nextTile.join('-'))
    }
  }
  if(mr === 0 && mc < 0) {
    for (let c = -1; c > mc; c--) {
      const nextTile = [ first[0] + c, first[1] ]
      totalTiles.add(nextTile.join('-'))
    }
  }


  for (let i = 0; i < redTiles.length - 1; i++) {
    const current = redTiles[i]
    const next = redTiles[i + 1]

    const movement = [ next[0] - current[0], next[1] - current[1] ]
   
    const [cols, rows] = movement

    if(cols === 0 && rows > 0) {
      for (let r = 1; r < rows; r++) {
        const nextTile = [ current[0], current[1] + r ]
        totalTiles.add(nextTile.join('-'))
      }
    }
    if(rows === 0 && cols > 0) {
      for (let c = 1; c < cols; c++) {
        const nextTile = [ current[0] + c, current[1] ]
        totalTiles.add(nextTile.join('-'))
      }
    }
    if(cols === 0 && rows < 0) {
      for (let r = -1; r > rows; r--) {
        const nextTile = [ current[0], current[1] + r ]
        totalTiles.add(nextTile.join('-'))
      }
    }
    if(rows === 0 && cols < 0) {
      for (let c = -1; c > cols; c--) {
        const nextTile = [ current[0] + c, current[1] ]
        totalTiles.add(nextTile.join('-'))
      }
    }
  }

  const cols = Math.max(...redTiles.map(t => t[0])) + 1
  const rows = Math.max(...redTiles.map(t => t[1])) + 1

  console.log('cols', '=', cols, 'rows', '=', rows)
  
  console.log('totalTiles.size', totalTiles.size)
  console.log('redTiles.length', redTiles.length)

  let biggestArea = 0

  let counter = 1
  let vertexDP: Record<string, boolean> = {}
  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const vertex1 = redTiles[i] 
      const vertex2 = redTiles[j]
      const _vertex1 = [vertex2[0] ,vertex1[1]]
      const _vertex2 = [vertex1[0] , vertex2[1]]

      if(vertexDP[_vertex1.join('-')])

      
      if(isInside(_vertex1) && isInside(_vertex2)) {
        console.log('rectangle', vertex1, vertex2, _vertex1, _vertex2)
        const area = Math.abs(vertex1[0] - vertex2[0] + 1) * Math.abs(vertex1[1] - vertex2[1] + 1)
        biggestArea = Math.max(biggestArea, area)
      }
      

    }
    counter++
  }

  function isInside(vertex: number[]) {
    if(totalTiles.has(vertex.join('-'))) {
      return true
    }
    let counter = 0
    for (let i = 0; i < cols; i++) {
      const newTile = [vertex[0] + i, vertex[1]]
      if(totalTiles.has(newTile.join('-')) && totalTiles.has([newTile[0]+1, newTile[1]].join('-'))) {
        return false
      }
      if(totalTiles.has(newTile.join('-'))) {
        counter++
      }      
    }
    if(counter % 2 === 0) {
      return false
    }
    return true
  }

  console.log('biggestArea', biggestArea)

  return
}

biggestRectangle()