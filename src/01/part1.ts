import {getInput} from "../file_reader"

function rotations() {
  const input = getInput('01')

  const lines = input.split('\n').filter(line => line.trim() !== '')

  let currentPosition = 50

  const orders: {direction: string, value: number}[] = []

  lines.forEach(line => {
    orders.push({direction: line.substring(0,1), value: Number(line.substring(1))})
  })

  let zeroes = 0

  orders.forEach(o => {
    let position = 0

    if(o.direction === 'L') {
      position = currentPosition - o.value
    }
    if(o.direction === 'R') {
      position = currentPosition + o.value
    }

    currentPosition = ((position % 100) + 100) % 100

    if(currentPosition === 0) {
      zeroes += 1
    }
  })
  console.log(zeroes)
}

rotations()