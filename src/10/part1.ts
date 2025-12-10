import { getInput } from "../file_reader"

function pressButtons() {
  const rawInput = getInput('10', true)

  const input = rawInput.split('\r\n').map(row => row.split(' '))

  const cleanInput = input.map(i => {
    const [lightDiagram, ...buttonWiring] = i
    const joltage = buttonWiring.pop()

    const cleanLightDiagram = lightDiagram.substring(1, lightDiagram.length - 1).split('')
  
    return [cleanLightDiagram, buttonWiring, joltage]
  })

  // console.log(cleanInput)

  for(let line of cleanInput) {
    // console.log('line', line)
    const lightDiagram: string[] = line[0] as string[]
    const buttonsWiring: string[] = line[1] as string[]
    const joltage: string = line[2] as string

    let lightDiagramResult = Array.from({length: lightDiagram.length}, (i) => '.')

    // const lightsOff = Array.from({length: lightDiagram.length}, (i) => '.')

    buttonsWiring.forEach(b => {
      // lightDiagramResult = press(lightDiagramResult, b)
    })

  }

}

let lightDiagram = [ '.', '.', '.', '.' ]
// const buttons = ['(3)', '(1,3)', '(2)', '(2,3)', '(0,2)', '(0,1)']
const buttons = ['(3)', '(1,3)', '(2)']

// buttons.forEach(b => {
//   lightDiagram = press(lightDiagram, b)
// })

function press(lightDiagram: string[], buttons: string) {
  // console.log('inp', lightDiagram)
  // console.log('buttons', buttons)
  const buttonsArray = buttons.substring(1, buttons.length - 1).split(',')
  // let result = Array.from({length: lightDiagram.length}, (i) => '.')
  let result = lightDiagram


  buttonsArray.forEach(b => {
    let button = Number(b)
    // console.log(button)
    // console.log('status', result[button])
    
    result[button] = result[button] === '.' ? '#' : '.'
  })

  // console.log('res', result)
  // console.log('---------------------')
  return result
}

// pressButtons()


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

// [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}

const result: string[][] = getPowerSet(['(3)', '(1,3)', '(2)', '(2,3)', '(0,2)', '(0,1)'])


let min = Number.POSITIVE_INFINITY
result.forEach(r => {
  let lightDiagram = ['.','.','.','.']
  let result: string[] = []
  r.forEach(i => {
    result = press(lightDiagram, i)
    lightDiagram = result
    console.log('result', result.join(''))
  })
  if(result.join('') == '.##.') {
    console.log('inside')
    min = Math.min(min, r.length)
    console.log(r)
  }
})

console.log('min', min)