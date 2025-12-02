import { getInput } from "../file_reader"

function rotations() {
  const input = getInput('01', false)

  const lines = input.split('\n').filter(line => line.trim() !== '')

  let currentPosition = 50
  let zeroes = 0

  const orders: {direction: string, value: number}[] = []

  lines.forEach(line => {
    orders.push({direction: line.substring(0,1), value: Number(line.substring(1))})
  })

  console.log('orders', orders)

  orders.forEach(order => {
    let remain = order.value

    if(order.direction === 'L') {
      while (remain !== 0) {
        let nextPosition = (((currentPosition - 1) % 100) + 100) % 100
        if(nextPosition == 0) {
          zeroes++
        }
        currentPosition--
        remain--
      }
    }
    if(order.direction === 'R') {
      while (remain !== 0) {
        let nextPosition = (((currentPosition + 1) % 100) + 100) % 100
        if(nextPosition == 0) {
          zeroes++
        }
        currentPosition++
        remain--
      }
    }
    console.log('zeroes', zeroes)
  })
}

rotations()