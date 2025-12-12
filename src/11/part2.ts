import { getInput } from "../file_reader"

function memoizationPaths() {
  // 1. Carga y Construcción del Grafo (misma lógica que en tu código)
    const rawInput = getInput('11', false)
    const inputLines = rawInput.split('\r\n')
    const graph: Record<string, string[]> = {}

    inputLines.forEach(line => {
        const [node, rest] = line.split(':')
        // Limpiamos los espacios alrededor de los hijos:
        const children = rest.trim().split(' ') 
        graph[node] = children
    })

    // 2. Mapa de Memoización:
    // Clave: "nodo:hasFft(0/1):hasDac(0/1)" -> Valor: número de caminos válidos
    const memo = new Map<string, number>();

    /**
     * Función DFS recursiva con Memoización y Backtracking.
     * @param currentNode El nodo actual.
     * @param pathCurrent El camino recorrido hasta ahora (usado para prevenir ciclos).
     * @param hasFft Indica si 'fft' ha sido visitado.
     * @param hasDac Indica si 'dac' ha sido visitado.
     * @returns Número de caminos válidos encontrados desde este estado hasta 'out'.
     */
    function dfs(
        currentNode: string, 
        pathCurrent: Set<string>, 
        hasFft: boolean, 
        hasDac: boolean
    ): number {
        
        // --- 1. MEMOIZACIÓN: Chequeo de Estado ---
        // Generamos una clave única que representa el estado del subproblema.
        const key = `${currentNode}:${hasFft ? 1 : 0}:${hasDac ? 1 : 0}`;
        if (memo.has(key)) {
            return memo.get(key)!;
        }

        // --- 2. CONDICIÓN DE ÉXITO Y PARADA ---
        if (currentNode === 'out') {
            // Si llegamos a 'out', devolvemos 1 si se cumplen ambas condiciones, 0 si no.
            return (hasFft && hasDac) ? 1 : 0;
        }
        
        // --- 3. EXPLORACIÓN ---
        let currentValidPaths = 0;
        const children = graph[currentNode] || [];

        for (const child of children) {
            // Prevenir ciclos: si el hijo ya está en el camino actual, no lo sigas.
            if (!pathCurrent.has(child)) {
                
                // Backtracking implícito:
                // a) Creamos una COPIA del set para el nuevo camino y añadimos el hijo.
                const newPath = new Set(pathCurrent).add(child);
                
                // b) Actualizamos el estado de las condiciones intermedias.
                const newHasFft = hasFft || (child === 'fft');
                const newHasDac = hasDac || (child === 'dac');

                // Llamada recursiva: sumamos los resultados de la rama.
                currentValidPaths += dfs(child, newPath, newHasFft, newHasDac);
            }
        }

        // --- 4. MEMOIZACIÓN: Almacenar Resultado ---
        // Guardamos el resultado total de caminos válidos encontrados desde este estado.
        memo.set(key, currentValidPaths);
        
        return currentValidPaths;
    }
    
    // Iniciar la búsqueda desde 'svr'
    // Usamos Set para el camino para asegurar O(1) en la verificación de ciclos (pathCurrent.has).
    const initialPath = new Set(['svr']);
    const result = dfs('svr', initialPath, false, false);
    
    console.log('Total caminos válidos (DFS Memoizado):', result);
}

function paths() {
  const rawInput = getInput('11', false)

  const inputLines = rawInput.split('\r\n')

  const graph: Record<string, string[]> = {}

  inputLines.forEach(line => {
    const [node, rest] = line.split(':')

    const children = rest.trim().split(' ')

    graph[node] = children
  })

  // console.log(graph)

  // let currentNode = 'svr'
  let nodeStack: {node: string, path: string[]}[] = []
  nodeStack.push({node: 'svr', path:['svr']})

  let counter = 0

  while (nodeStack.length > 0) {
    const current = nodeStack.pop()!
    const currentNode = current.node
    const currentPath = current.path
    
    if(currentNode === 'out') {
      if(currentPath.includes('fft') && currentPath.includes('dac')) {
        counter++
      }
      continue
    }
    
    const children = graph[currentNode]

    for(const child of children) {
      if(!currentPath.includes(child)) {
        const newPath = [...currentPath, child]

        nodeStack.push({node: child, path: newPath})
      }
    }
  }

  console.log('counter', counter)
}

memoizationPaths()