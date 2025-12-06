import { getInput } from "../file_reader"

function sumOfOperations() {
  const rawInput = getInput('06', true)

  const input = rawInput.split('\r\n').map(row => row.split(' ').filter(i => i !== ''))
  
  console.log(input)

  let result = 0

  for (let i = 0; i <= input[0].length - 1; i++) {
    let elements = []
    for (let j = 0; j < input.length; j++) {
      const element = input[j][i];
      console.log('element', element)
      if(!isNaN(Number(element))){
        elements.push(Number(element))
      } else {
        if(element === '+') {
          let reduce = elements.reduce((acc, current) => acc + current)
          console.log('reduce', reduce)
          result += reduce
        }
        if(element === '*') {
          let reduce = elements.reduce((acc, current) => acc * current)
          console.log('reduce', reduce)
          result += reduce
        }
      }
    }
    console.log(elements)
    console.log('----')
  }
  console.log('result', result)
}

sumOfOperations()