import { getInput } from "../file_reader"

function fresh() {
  const input = getInput('05', false)
  const [ranges, ingredients] = input.split('\r\n\r\n').map(part => part.split('\r\n'))

  const splitRanges = ranges.map(r => r.split('-'))
  const freshIngredients = new Set()

  ingredients.forEach(ingredient => {
    splitRanges.forEach(range => {
      const nIngredient = Number(ingredient)
      if(nIngredient >= Number(range[0]) && nIngredient <= Number(range[1])) {
        freshIngredients.add(nIngredient)
      }
    })
  })

  console.log('total', freshIngredients.size)
}

fresh()