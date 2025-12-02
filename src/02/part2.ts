import {getInput} from "../file_reader"

function invalidIds() {
  const input = getInput('02', false)

  const lines = input.split(',').filter(line => line.trim() !== '')
  
  let sum = 0

  lines.forEach(l => {
    const [start, end] = l.split('-').map(n => Number(n))
    console.log(start, end)
    for (let index = start; index <= end; index++) {
      const idxString = index.toString()
      const strLength = idxString.length

      const idsSet = new Set()

      for (let index = strLength; index >= 1; index--) {
        if(strLength % index === 0) {
          const patternString = `.{${index}}`
          const regex = new RegExp(patternString, 'g')
          const result = idxString.match(regex)
          if(result!.length > 1) {
            if(result?.every(v => result[0] === v)) {
              const joined = result.join('')
              idsSet.add(joined)
              console.log(idsSet)
            }
          }
        }
      }
      idsSet.forEach(id => {
        sum += Number(id)
      })
    }
  })

  console.log('sum', sum)
}

invalidIds()