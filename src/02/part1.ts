import {getInput} from "../file_reader"

function invalidIds() {
  const input = getInput('02')

  const lines = input.split(',').filter(line => line.trim() !== '')
  
  let sum = 0

  lines.forEach(l => {
    const [start, end] = l.split('-').map(n => Number(n))

    for (let index = start; index <= end; index++) {
      const strIdx = index.toString()
      if(strIdx.substring(0, strIdx.length/2) === strIdx.substring(strIdx.length/2, strIdx.length)) {
        console.log(index)
        sum += index
      }
    }
  })
  console.log('----------------------')
  console.log(sum)
}

invalidIds()