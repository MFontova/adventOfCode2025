import { getInput } from "../file_reader"

function splitter() {
  const rawInput = getInput('07', false)
  const input = rawInput.split('\r\n')

  let indexsToCheck = new Set<number>()
  let startIndex = input[0].indexOf('S')

  indexsToCheck.add(startIndex)

  let counter = 0

  for (let row = 1; row < input.length; row++) {
    if(input[row].includes('^')) {
      indexsToCheck.forEach(index => {
        if(input[row][index] === '^') {
          indexsToCheck.delete(index)
          indexsToCheck.add(index - 1)
          indexsToCheck.add(index + 1)
          counter++
        }
      })
    }
  }

  console.log('counter', counter)
}

splitter()