import { getInput } from "../file_reader"

function pressButtons() {
  const rawInput = getInput('10', false)

  const input = rawInput.split('\r\n').map(row => row.split(' '))

  const cleanInput = input.map(i => {
    const [lightDiagram, ...buttonWiring] = i
    const joltage = buttonWiring.pop()

    const cleanLightDiagram = lightDiagram.substring(1, lightDiagram.length - 1).split('')
  
    return [cleanLightDiagram, buttonWiring, joltage]
  })

  let result = 0
  for(let line of cleanInput) {
    let min = Number.POSITIVE_INFINITY
    const lightDiagram: string[] = line[0] as string[]
    const buttonsWiring: string[] = line[1] as string[]
    const joltage: string = line[2] as string

    const buttonCombinations = getPowerSet(buttonsWiring)

    buttonCombinations.forEach(combination => {
      let lightDiagramResult = Array.from({length: lightDiagram.length}, (i) => '.')
      combination.forEach(button => {
        lightDiagramResult = press(lightDiagramResult, button)
      })
      if(lightDiagramResult.join('') === lightDiagram.join('')) {
        min = Math.min(min, combination.length)
      }
    })

    result += min

  }
  console.log('result', result)
}

pressButtons()


function press(lightDiagram: string[], buttons: string) {
  const buttonsArray = buttons.substring(1, buttons.length - 1).split(',')
  let result = lightDiagram


  buttonsArray.forEach(b => {
    let button = Number(b)
    result[button] = result[button] === '.' ? '#' : '.'
  })

  return result
}

function getPowerSet(set: any[]) {
  const n = set.length;
  const totalSubsets = 1 << n; // Calcula 2^n de forma eficiente

  const powerSet = [];

  // Bucle externo: i recorre todas las "recetas" binarias (0 a 7)
  for (let i = 0; i < totalSubsets; i++) {
    const subset = [];
    
    // Bucle interno: j recorre cada elemento del conjunto ('a', 'b', 'c')
    for (let j = 0; j < n; j++) {
      // 1. Crea la máscara: (1 << j) aísla la posición del bit
      // 2. Comprueba si el bit j está activo en el número i
      if (i & (1 << j)) {
        // Si el bit es 1, incluye el elemento
        subset.push(set[j]);
      }
    }
    powerSet.push(subset); // Guarda el subconjunto generado
  }
  return powerSet;
}
