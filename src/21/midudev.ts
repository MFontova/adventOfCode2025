function clearGifts(warehouse: string[][], drops: number[]): string[][] {
  const warehouseHeight = warehouse.length
  const warehouseWidth = warehouse[0].length

  for(let drop of drops) {
    let positionToCheck = warehouseHeight - 1

    while (positionToCheck >= 0) {
      if(warehouse[positionToCheck][drop] === '.') {
        warehouse[positionToCheck][drop] = '#'
        break
      }

      positionToCheck--
    }

    if(warehouse[warehouseHeight - 1].join('') === '#'.repeat(warehouseWidth)) {
      warehouse.unshift(Array.from({length: warehouseWidth}, (_) => '.'))
      warehouse.pop()
    }
  }

  return warehouse
}

// clearGifts(
//   [
//     ['.', '.', '.'],
//     ['.', '.', '.'],
//     ['#', '.', '#']
//   ],
//   [1]
// )

clearGifts(
  [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
  ],
  [0, 0, 0, 1, 1, 2]
)