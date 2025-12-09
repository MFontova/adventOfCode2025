import { getInput } from "../file_reader"

function connect() {
  const rawInput = getInput('08', false)
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
  // console.log(filteredEdges)
  
  let circuits: Array<Set<number>> = Array.from({length: input.length}, (_,i) => new Set([i]))

  const lastIncorporation = []
  for (let index = 0; index < filteredEdges.length; index++) {
    const { distance, i, j } = filteredEdges[index]
    
    const circuit_i_index = circuits.findIndex(c => c.has(i))
    const circuit_j_index = circuits.findIndex(c => c.has(j))

    // console.log(i, j)

    if(circuit_i_index !== circuit_j_index) {
      circuits[circuit_i_index] = new Set([...circuits[circuit_i_index], ...circuits[circuit_j_index]])
      circuits[circuit_j_index] = new Set()
    }

    if(circuits.some(c => c.size === input.length)) {
      lastIncorporation.push(i, j)
      break
    }

    // console.log(circuits)
    // console.log('------------------------------------')
  }

  console.log('input.length', input.length)
  // console.log(circuits)
  circuits.sort((a, b) => b.size - a.size)
  // console.log(circuits[0])
  console.log(lastIncorporation)

  console.log(input[lastIncorporation[0]][0] * input[lastIncorporation[1]][0])

  return
}

function euclideanDistance(a: number[], b: number[]) {
  return Math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2 + (b[2] - a[2])**2)
}

connect()