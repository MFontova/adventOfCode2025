type Data = Array<Record<string, string | number>>
type SortBy = string

function drawTable(data: Data, sortBy: SortBy): string {
  let table = ''

  const sortedData = data.sort((a, b) => {
    if(a[sortBy] > b[sortBy]) return 1
    if(a[sortBy] < b[sortBy]) return -1
    return 0
  })

  const keys: Array<string> = Object.keys(data[0])
  
  let headerBase = ''
  let headerBody = ''
  let tableBody = ''

  let maxLenghts: number[] = []

  keys.forEach(key => {
    const maxLenght = Math.max(...sortedData.map(e => e[key]).map(v => v.toString().length))
    maxLenghts.push(maxLenght)
  })

  sortedData.forEach((data, index) => {
    keys.forEach((key, keyIndex) => {
      const maxLenght = maxLenghts[keyIndex]
      if(index === 0) {
        headerBase += `+${'-'.repeat(maxLenght + 2)}`
        headerBody += `| ${String.fromCharCode(65 + keyIndex).padEnd(maxLenght + 1)}`
      }
      tableBody += `| ${data[key]}`.padEnd(maxLenght + 3)
    })
    tableBody += '|\n'
  })

  headerBase += '+'
  headerBody += '|'


  table += headerBase + '\n'
  table += headerBody + '\n'
  table += headerBase + '\n'
  table += tableBody
  table += headerBase

  console.log(table)
  return table
}

drawTable(
  [
    { name: 'Charlie', city: 'New York' },
    { name: 'Alice', city: 'London' },
    { name: 'Bob', city: 'Paris' }
  ],
  'name'
)

// drawTable(
//   [
//     { gift: 'Book', quantity: 5 },
//     { gift: 'Music CD', quantity: 1 },
//     { gift: 'Doll', quantity: 10 }
//   ],
//   'quantity'
// )