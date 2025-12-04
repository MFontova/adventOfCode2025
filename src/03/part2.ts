import { getInput } from "../file_reader"

function largestJolts() {
  const input = getInput('03', false)

  const lines = input.split('\r\n')

  console.log('lines', lines)

  let result = 0

  lines.forEach(line => {
    let max = 12
    let leftLimit = 0
    let rightLimit = line.length - leftLimit - max

    let joltage = ''

    while (joltage.length < 12) {
      let highest = 0
      let ll = leftLimit
      let rl = rightLimit

      for (let i = ll; i <= rl; i++) {
        const element = Number(line[i])
        if(highest < element) {
          highest = element
          leftLimit = i + 1
        }
      }

      joltage += highest.toString()
      rightLimit = leftLimit + (line.length - leftLimit - (max - joltage.length))

    }
    console.log('joltage', joltage)

    result += Number(joltage)
    
  })

  console.log('result', result)
}

largestJolts()