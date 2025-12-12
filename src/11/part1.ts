import { getInput } from "../file_reader"

function paths() {
  const rawInput = getInput('11', false)

  const inputLines = rawInput.split('\r\n')

  const graph: Record<string, string[]> = {}

  inputLines.forEach(line => {
    const [node, rest] = line.split(':')

    const children = rest.trim().split(' ')

    graph[node] = children
  })

  let currentNode = 'you'
  const nodeStack = [currentNode]

  let counter = 0

  while (nodeStack.length > 0) {
    currentNode = nodeStack.pop()!

    const children = graph[currentNode]

    if(children) {
      nodeStack.push(...children)
    } else {
      counter++
    }
  }

  console.log('counter', counter)
}

paths()