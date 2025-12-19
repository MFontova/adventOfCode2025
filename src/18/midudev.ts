function hasFourInARow(board: string[][]): boolean {
  const directions = [
    [0,1],
    [1,0],
    [1,1],
    [1,-1]
  ]

  const chars = ['R', 'G']

  const length = 4

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const element = board[i][j];
      if(!chars.includes(element)){
        continue
      }
      for(const direction of directions) {
        let positions = 1
        let newI = i
        let newJ = j
        for (let i = 1; i < length; i++) {
          newI += direction[0]
          newJ += direction[1]
          
          if(newI >= 0 && newI < board.length && newJ >= 0 && newJ < board[0].length) {
            if(board[newI][newJ] === element) {
              positions++
              if(positions === length) {
                return true
              }
            }
          }
        }
      }
    }
  }
  return false
}

// console.log(hasFourInARow([
//   ['R', '.', '.', '.'],
//   ['.', 'R', '.', '.'],
//   ['.', '.', 'R', '.'],
//   ['.', '.', '.', 'R']
// ]))

console.log(hasFourInARow([
  ['.', '.', '.', 'G'],
  ['.', '.', 'G', '.'],
  ['.', 'G', '.', '.'],
  ['.', '.', '.', '.']
]))

// console.log(hasFourInARow([
//   ['R', 'G', 'R'],
//   ['G', 'R', 'G'],
//   ['G', 'R', 'G']
// ]))