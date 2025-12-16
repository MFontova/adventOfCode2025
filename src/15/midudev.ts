type Data = Array<Record<string, string | number>>
type SortBy = string

function drawTable(data: Data, sortBy: SortBy): string {
  let table = ''
  let tableLines: string[] = []

  let sortedData = [...data]
  sortedData = sortedData.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) return 1
    if (a[sortBy] < b[sortBy]) return -1
    return 0
  })

  const keys: Array<string> = Object.keys(data[0])

  let headerBase = ''
  let headerBody = ''
  let tableBody: string[] = []

  let maxLengths: number[] = []

  keys.forEach((key, keyIndex) => {
    const maxLength = Math.max(...sortedData.map(e => e[key]).map(v => v.toString().length))
    maxLengths.push(maxLength)
    headerBase += `+${'-'.repeat(maxLength + 2)}`
    headerBody += `| ${String.fromCharCode(65 + keyIndex).padEnd(maxLength + 1)}`
  })

  sortedData.forEach((data, index) => {
    let tbLine = ''
    keys.forEach((key, keyIndex) => {
      const maxLenght = maxLengths[keyIndex]
      // if (index === 0) {
      //   headerBase += `+${'-'.repeat(maxLenght + 2)}`
      //   headerBody += `| ${String.fromCharCode(65 + keyIndex).padEnd(maxLenght + 1)}`
      // }
      tbLine += `| ${data[key]}`.padEnd(maxLenght + 3)
    })
    tableBody.push(tbLine + '|')
  })

  headerBase += '+'
  headerBody += '|'
  tableLines = [headerBase, headerBody, headerBase, ...tableBody, headerBase]

  console.log(tableLines.join('\n'))
  return tableLines.join('\n')
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