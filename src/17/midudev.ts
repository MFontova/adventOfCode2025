function hasFourLights(board: string[][]): boolean {
  if (board.length < 4 && board[0].length < 4) {
    return false
  }

  for (let i = 0; i < board.length; i++) {
    const row = board[i].join('');
    if(row.includes('RRRR') || row.includes('GGGG')) {
      return true
    }
  }

  for (let i = 0; i < board[0].length; i++) {
    let col = ''
    for (let j = 0; j < board.length; j++) {
      const element = board[j][i];
      col += element    
    }
    if(col.includes('RRRR') || col.includes('GGGG')) {
      return true
    }
  }

  return false
}

console.log(hasFourLights([
  ['.', '.', '.', '.', '.'],
  ['R', 'R', 'R', 'R', '.'],
  ['G', 'G', '.', '.', '.']
]))

console.log(hasFourLights([
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.'],
  ['.', 'G', '.', '.']
]))
// true → hay 4 luces verdes en vertical

console.log(hasFourLights([
  ['R', 'G', 'R'],
  ['G', 'R', 'G'],
  ['G', 'R', 'G']
]))