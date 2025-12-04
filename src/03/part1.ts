import { getInput } from "../file_reader"

function largestJolts() {
  const input = getInput('03', false)

  const lines = input.split('\r\n')

  console.log('lines', lines)

  let result = 0

  lines.forEach(line => {
    let first = 0
    let second = 0
    let firstPosition = 0

    for (let i = 0; i < line.length - 1; i++) {
      const element = Number(line[i]);
      if(first < element) {
        first = element
        firstPosition = i
      }
    }

    let substring = line.substring(firstPosition + 1)

    for (let i = 0; i < substring.length; i++) {
      const element = Number(substring[i]);
      if(second < element) {
        second = element
      }
    }
    
    console.log('first', first)
    console.log('second', second)
    console.log('firstPosition', firstPosition)
    console.log('----')

    result += Number(first.toString() + second.toString())
  })

  console.log('result', result)
}

largestJolts()