import { getInput } from "../file_reader"

function validPaths() {
  // 1. Cargamos el input y generamos el grafo
  const rawInput = getInput('11', false)
  const inputLines = rawInput.split('\r\n')
  const graph: Record<string, string[]> = {}

  inputLines.forEach(line => {
      const [node, rest] = line.split(':')
      // Limpiamos los espacios alrededor de los hijos:
      const children = rest.trim().split(' ') 
      graph[node] = children
  })

  const memo = new Map<string, number>()

  const result = recursiveDfs('svr', new Set(['svr']), false, false)

  console.log('result', result)
  
  function recursiveDfs(
    currentNode: string,
    currentPath: Set<string>,
    hasFft: boolean,
    hasDac: boolean,
  ) {
  
    const nodeKey = `${currentNode}-${hasFft}-${hasDac}`
    if(memo.has(nodeKey)) {
      return memo.get(nodeKey)!
    }

    // Caso de salida
    if(currentNode === 'out') {
      return hasDac && hasFft ? 1 : 0
    }
  
    const children = graph[currentNode] || []
    
    let paths = 0
    for (const child of children) {
      if(!currentPath.has(child)) {
        const newPath = new Set(currentPath).add(child)
        const newHasFft = hasFft || (child === 'fft')
        const newHasDac = hasDac || (child === 'dac')
  
        paths += recursiveDfs(child, newPath, newHasFft, newHasDac)
      }
    }
  
    memo.set(nodeKey, paths)
    return paths
  }
}

validPaths()
