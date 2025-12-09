import { getInput } from "../file_reader"

function biggestRectangle() {
  const rawInput = getInput('09', false)

  const input = rawInput.split('\r\n')

  // console.log(input)

  let biggestArea = 0
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const currentElement = input[i].split(',').map(n => Number(n)); 
      const nextElement = input[j].split(',').map(n => Number(n)); 

      const area = Math.abs(currentElement[0] - nextElement[0] + 1) * Math.abs(currentElement[1] - nextElement[1] + 1)

      if(area > biggestArea) {
        biggestArea = area
      }
    }    
  }

  console.log('biggestArea', biggestArea)
}

biggestRectangle()