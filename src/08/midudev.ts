function findUniqueToy(toy: string): string {
  const repetitions: Record<string, number> = {}
  for (let i = 0; i < toy.length; i++) {
    const letter = toy[i].toLocaleLowerCase()
    repetitions[letter] = repetitions[letter] ? repetitions[letter] + 1 : 1
  }

  console.log(repetitions)
  const values = Object.values(repetitions)
  const keys = Object.keys(repetitions)

  for (let i = 0; i < values.length; i++) {
    const element = values[i];
    if(element === 1) {
      const letter = keys[i]
      const index = toy.toLocaleLowerCase().indexOf(letter)
      return toy[index]
    }
  }

  return ''
}

console.log(findUniqueToy('aabbc')) // 'G'
// console.log(findUniqueToy('Gift')) // 'G'
// console.log(findUniqueToy('sS'))