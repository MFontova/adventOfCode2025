function clearGifts(warehouse: string[][], drops: number[]): string[][] {
  const wareHouseHeight = warehouse.length

  console.log(drops)

  for(let drop of drops) {
    let positionToCheck = wareHouseHeight - 1

    console.log('positionToCheck', positionToCheck)
    console.log('drop', drop)

    console.log(warehouse[positionToCheck][drop])

    while (positionToCheck >= 0) {
      if(warehouse[positionToCheck][drop] === '.') {
        console.log('place!')
        warehouse[positionToCheck][drop] = '#'
        break
      }

      positionToCheck--
    }

    if(warehouse[wareHouseHeight - 1].join('') === '###') {
      warehouse.pop()
      warehouse.unshift(['.', '.', '.'])
    }
  }

  console.log(warehouse)
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