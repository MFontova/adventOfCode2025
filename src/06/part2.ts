import { getInput } from "../file_reader"

function sumOfOperations() {
  const rawInput = getInput('06', false)

  let input = rawInput.split('\r\n')
  
  console.log(input)

  const operations = input[input.length - 1].split('').filter(e => e !== ' ').reverse()
  console.log(operations)

  let total = 0

  const operationsList: number[][] = []
  let singleOperation: number[] = []

  for (let i = input[0].length - 1; i >= 0; i--) {
    let number = ''
    for(let j = 0; j < input.length; j++) {
      const element = input[j][i];
      if(element !== '' && element !== '*' && element !== '+') {
        number += element.trim()
      }
    }
    console.log('number', number)
    console.log('i', i)
    if(number === '') {
      operationsList.push(singleOperation)
      singleOperation = []
    } else {
      singleOperation.push(Number(number))
    }

    if(i === 0) {
      operationsList.push(singleOperation)
    }
  }

  console.log(operationsList)

  for (let index = 0; index < operationsList.length; index++) {
    if(operations[index] === '+') {
      let op = operationsList[index].reduce((acc, curr) => acc + curr)
      console.log(op)
      total += op
    }
    if(operations[index] === '*') {
      let op = operationsList[index].reduce((acc, curr) => acc * curr)
      console.log(op)
      total += op
    }
  }

  console.log('total', total)
}

sumOfOperations()