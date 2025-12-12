function findUnsafeGifts(warehouse: string[]): number {
  let counter = 0
  const directions = [ [-1, 0], [1, 0], [0, -1], [0, 1] ]

  for(let row = 0; row < warehouse.length; row++) {
    for(let col = 0; col < warehouse[row].length; col++) {
      const element = warehouse[row][col]
      if(element === '*') {
        counter++
        let cameraCounter = 0
        for(let direction of directions) {
          const [checkRow, checkCol] = [row + direction[0], col + direction[1]]
          if(checkRow >= 0 && checkRow < warehouse.length && checkCol >= 0 && checkCol < warehouse[row].length) {
            if(warehouse[checkRow][checkCol] === '#') {
              cameraCounter++
            }
          }
        }
        if(cameraCounter > 0) {
          counter--
        }
      }
    }
  }

  console.log('counter', counter)
  return 0
}

findUnsafeGifts([
  '...#....',
  '..*#*..',
  '...#....',
]) // ➞ 4