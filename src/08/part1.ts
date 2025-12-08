import { getInput } from "../file_reader"

function connect() {
  const rawInput = getInput('08', true)
  const input = rawInput.split('\r\n').map(item => item.split(',').map(i => Number(i)))

  const edges: {distance: number, i: number, j: number}[] = []

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const distance = euclideanDistance(input[j], input[i])
      edges.push({distance: distance, i: i, j: j})
    }
  }

  edges.sort((a, b) => a.distance - b.distance)

  const filteredEdges = edges.filter(edge => edge.distance !== 0)
  console.log(edges)
  
  let circuits: Array<Set<number>> = Array.from({length: input.length}, (_,i) => new Set([i]))

  console.log(circuits)
  
  const maxCircuits = 10

  for (let index = 0; index < maxCircuits; index++) {
    const {distance, i, j} = edges[index]

    circuits[i] = new Set([...circuits[i], ...circuits[j]])
    circuits[j] = new Set()

    if(circuits.some(c => {
      if(c.has(i)) {
        return true
      }
      if(c.has(j)) {
        return true
      }
    })) {
      const circuitIndex = circuits.findIndex(c => {
        if(c.has(i)) {
          return true
        }
        if(c.has(j)) {
          return true
        }
      })
      circuits[circuitIndex].add(i)
      circuits[circuitIndex].add(j)
    } else {
      circuits.push(new Set([i, j]))
    }
  }

  console.log('circuits', circuits)
  const testSet = new Set()
  console.log('testSet', testSet.size)

  for (let index = circuits.length - 1; index >= 0; index--) {
    const element = circuits[index];
    
    if(element.size > 1) {
      
    }
  }
}

function euclideanDistance(a: number[], b: number[]) {
  return Math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2 + (b[2] - a[2])**2)
}

connect()