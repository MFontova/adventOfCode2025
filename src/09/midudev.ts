type Board = string
type Moves = string
type Result = 'fail' | 'crash' | 'success'

function moveReno(board: Board, moves: Moves): Result {
  const movements = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0],
  }

  const boardArray = board.trim().split('\n')

  const cols = boardArray[0].length
  const rows = boardArray.length

  let startPosition = [0, 0]
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const element = boardArray[row][col];
      if(element === '@') {
        startPosition = [row, col]
        break
      }
    }    
  }

  let result: Result = 'fail'

  let newPosition = [startPosition[0], startPosition[1]]
  for(let m of moves.split('')) {
    const move = movements[m as keyof typeof movements]
    newPosition = [newPosition[0] + move[0], newPosition[1] + move[1]]
  
    if(!insideLimits(newPosition)) {
      if(result !== 'success') {
        result = 'crash'
      }
      break
    }

    const nextElement = boardArray[newPosition[0]][newPosition[1]]
    if(nextElement === '*') {
      result = 'success'
    }
    if(nextElement === '#') {
      if(result !== 'success') {
        result = 'crash'
        break
      }
    }
  }

  function insideLimits(position: number[]) {
    const [row, col] = position
    return row >= 0 && row < rows && col >= 0 && col < cols
  }

  return result
}

const board = `
.....
.*#.*
.@...
.....
`

// console.log(moveReno(board, 'D'))
// ➞ 'fail' -> se mueve pero no recoge nada

// console.log(moveReno(board, 'U'))
// ➞ 'success' -> recoge algo (*) justo encima

// console.log(moveReno(board, 'RU'))
// ➞ 'crash' -> choca contra un obstáculo (#)

// console.log(moveReno(board, 'RRRUU'))
// // ➞ 'success' -> recoge algo (*)

// console.log(moveReno(board, 'DD'))
// // ➞ 'crash' -> se choca con la parte de abajo del tablero

console.log(moveReno(board, 'UUU'))
// // ➞ 'success' -> recoge algo del suelo (*) y luego se choca por arriba

// console.log(moveReno(board, 'RR'))
// ➞ 'fail' -> se mueve pero no recoge nada