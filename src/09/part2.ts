import { getInput } from "../file_reader"

function biggestRectangle() {
  const rawInput = getInput('09', false)

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


  // return

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

  // console.log([...totalTiles].sort())
  
  // let counter = 0
  // for (let c = 0; c < cols; c++) {
  //   for (let r = 0; r < rows; r++) {
  //     const currentTile = [c, r];
  //     const leftTile = [c - 1, r]
  //     const topTile = [c, r - 1]
      
  //     if(tileInsideLimits(leftTile) && tileInsideLimits(topTile)) {
  //       if(totalTiles.has(leftTile.join('-')) && totalTiles.has(topTile.join('-'))) {
  //         totalTiles.add(currentTile.join('-'))
  //       }
  //     }
  //   }
  //   counter++
  //   console.log(counter)
  // }
  
  console.log('totalTiles.size', totalTiles.size)
  console.log('redTiles.length', redTiles.length)

  let biggestArea = 0

  let counter = 1
  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const vertex1 = redTiles[i] 
      const vertex2 = redTiles[j]
      const _vertex1 = [vertex2[0] ,vertex1[1]]
      const _vertex2 = [vertex1[0] , vertex2[1]]

      // console.log(vertex1, vertex2, _vertex1, _vertex2)

      if( isInsideUsingRayCasting(_vertex1) && isInsideUsingRayCasting(_vertex2) ) {
        const area = Math.abs(vertex1[0] - vertex2[0] + 1) * Math.abs(vertex1[1] - vertex2[1] + 1)
  
        if(area > biggestArea) {
          biggestArea = area
        }
      }

    }
    console.log(`${counter}/${redTiles.length}`)
    counter++
  }

  // const testVertex = [6,2]
  // vertexIsInside(testVertex)

  function isInsideUsingRayCasting(vertex: number[]): boolean {
    const [col, row] = vertex;
    let intersections = 0;
    
    // Lanzar rayo hacia la DERECHA (desde col + 1 hasta el borde de la matriz)
    // El rayo viaja por la fila 'row'.
    for (let i = col; i < cols; i++) {
        // Ignoramos el punto de inicio si también es un muro
        if (i === col && totalTiles.has(`${i}-${row}`)) continue;

        const tileKey = `${i}-${row}`;

        if (totalTiles.has(tileKey)) {
            // Caso 1: Manejar segmentos de muro horizontal
            // Estamos en una baldosa de muro. Queremos saber si este muro cruza la línea horizontal (row)
            // o si simplemente corre paralelo a ella (segmento horizontal).

            // Solo nos interesa contar las intersecciones con *segmentos verticales*.
            
            // Si el muro está por encima de la fila 'row', contamos un cruce.
            // O si el muro está por debajo de la fila 'row', y luego se "dobla" hacia la fila 'row'.

            // Simplificación para cuadrículas: Contamos solo si el muro "viene" o "va" de la fila, 
            // es decir, si hay muro en la posición (i, row) y en (i, row + 1) O (i, row - 1).
            
            const hasWallUp = row > 0 && totalTiles.has(`${i}-${row - 1}`);
            const hasWallDown = row < rows - 1 && totalTiles.has(`${i}-${row + 1}`);

            if (hasWallUp !== hasWallDown) {
                // Si el rayo toca un muro que tiene una pared solo arriba O solo abajo,
                // esto indica que estamos cruzando un segmento vertical.
                intersections++;
            }
            
            // Caso 2: Manejar vértices y aristas horizontales
            // Si es un segmento horizontal, no deberíamos contarlo como dos cruces (entrada/salida), 
            // sino como cero o dos (par), lo que se logra saltando el segmento.
            if (hasWallUp === hasWallDown) {
                // Esto es una arista horizontal (o un rincón interior). 
                // Buscamos el final del segmento de muro en la fila 'row'.
                let j = i + 1;
                while (j < cols && totalTiles.has(`${j}-${row}`)) {
                    j++;
                }
                i = j - 1; // Mover 'i' al final del segmento horizontal para continuar el rayo.
                continue; // Saltar a la siguiente iteración.
            }
        }
    }

    // El punto está dentro si el número de intersecciones es impar.
    return intersections % 2 !== 0;
  }
  
  function vertexIsInside(vertex: number[]) {
    let rightEncounter = false
    let leftEncounter = false
    let upEncounter = false
    let downEncounter = false

    let [vertexCol, vertexRow] = vertex

    // Check right
    for (let i = vertexCol; i < cols; i++) {
      const currentTile = [i, vertex[1]]
      // console.log('checking right', currentTile, totalTiles.has(currentTile.join('-')))
      if(totalTiles.has(currentTile.join('-'))) {
        rightEncounter = true
      }
    }

    // Check left
    for (let i = vertexCol; i > 0; i--) {
      const currentTile = [i, vertex[1]]
      if(totalTiles.has(currentTile.join('-'))) {
        leftEncounter = true
        
      }
    }

    // Check up
    for (let i = vertexRow; i > 0; i--) {
      const currentTile = [vertex[0], i]
      if(totalTiles.has(currentTile.join('-'))) {
        upEncounter = true
        
      }
    }

    // Check down
    for (let i = vertexRow; i < rows; i++) {
      const currentTile = [vertex[0], i]
      if(totalTiles.has(currentTile.join('-'))) {
        downEncounter = true
        
      }
    }

    return rightEncounter && leftEncounter && upEncounter && downEncounter
  }

  console.log('biggestArea', biggestArea)

  return
}

biggestRectangle()