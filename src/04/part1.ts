import { getInput } from "../file_reader"

function forklifts() {
  const input = getInput('04', true)

  const lines = input.split('\r\n')

  console.log(lines)

  let total = 0

  const directions: {row: number, col: number}[] = [
    {
      row: -1,
      col: -1,
    },
    {
      row: -1,
      col: 0,
    },
    {
      row: -1,
      col: 1,
    },
    {
      row: 0,
      col: -1,
    },
    {
      row: 0,
      col: 1,
    },
    {
      row: 1,
      col: -1,
    },
    {
      row: 1,
      col: 0,
    },
    {
      row: 1,
      col: 1,
    },
  ]

  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    for (let col = 0; col < line.length; col++) {
      const element = line[col];
      if(element === '@') {
        let rollsCount = 0

        directions.forEach(d => {
          if((col + d.col) >= 0 && (col + d.col) < line.length && (row + d.row) >= 0 && (row + d.row) < lines.length) {
            let newCol = col + d.col
            let newRow = row + d.row

            if(lines[newRow][newCol] === '@') {
              rollsCount++
            }
          }
        })
        
        if(rollsCount < 4) {
          total ++
        }
      }
    }
  }

  console.log('total', total)
}

forklifts()