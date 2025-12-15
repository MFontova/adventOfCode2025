type Data = Array<Record<string, string | number>>
type SortBy = string

function drawTable(data: Data, sortBy: SortBy): string {
  let table = ''

  const keys: Array<string | number> = Object.keys(data[0])

  console.log(keys)

  const sortedData = data.sort((a, b) => {
    return a[sortBy] > b[sortBy] ? 1 : -1
  })

  console.log(sortedData)

  let a: Array<string> = []
  let b: Array<string> = []

  sortedData.forEach(d => {

    a.push(d[keys[0]].toString())
    b.push(d[keys[1]].toString())
  })

  const largestA: number = Math.max(...(a.map(i => i.length)))
  const largestB: number = Math.max(...(b.map(i => i.length)))

  const edge = '+' + '-'.repeat(largestA + 2) + '+' + '-'.repeat(largestB + 2) + '+'

  table += edge + '\n'
  table += '|' + ' A'.padEnd(largestA + 2) + '|' + ' B'.padEnd(largestB + 2) + '|' + '\n'
  table += edge + '\n'

  for (let i = 0; i < a.length; i++) {
    const aElement = a[i];
    const bElement = b[i];

    table += '|' + ` ${aElement}`.padEnd(largestA + 2) + '|' + ` ${bElement}`.padEnd(largestB + 2) + '|' + '\n'
  }

  table += edge

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