type Glove = { hand: 'L' | 'R'; color: string }

function matchGloves(gloves: Glove[]): string[] {
  let result: string[] = []
  const paired = new Map<string, {right: number, left: number}>()

  gloves.forEach(g => {
    const current = paired.get(g.color)
    if(current !== undefined) {
      if(g.hand === 'L') {
        paired.set(g.color, {left: current.left + 1, right: current.right})
      } else {
        paired.set(g.color, {left: current.left, right: current.right + 1})
      }
    } else {
      paired.set(g.color, {right: g.hand === 'R' ? 1 : 0, left: g.hand === 'L' ? 1 : 0})
    }
  })

  paired.forEach((p, color) => {
    const pairs = Math.min(p.left, p.right)

    for (let i = 0; i < pairs; i++) {
      result.push(color)
    }
  })

  console.log(result)
  return result
}

// function matchGloves(gloves: Glove[]): string[] {
//   let editableGloves = [...gloves]
//   let result: string[] = []

//   while(editableGloves.length > 0) {
//     for (let index = 0; index < editableGloves.length; index++) {
//       const item = editableGloves[index];
//       if(editableGloves.some(i => i.hand !== item.hand && i.color === item.color)) {
//         const pairIndex = editableGloves.findIndex(i => i.hand !== item.hand && i.color === item.color)
//         console.log(index, pairIndex)
//         result.push(editableGloves[index].color)
//         editableGloves.splice(pairIndex, 1)
//       }
//       editableGloves.splice(index, 1)
//     }
//   }


//   console.log(result)
//   return result
// }

// function matchGloves(gloves: Glove[]): string[] {
//   const leftCounts = new Map<string, number>()
//   const rightCounts = new Map<string, number>()

//   const result: string[] = []

//   gloves.forEach(g => {
//     if(g.hand === 'L') {
//       const count = leftCounts.get(g.color) || 0
//       leftCounts.set(g.color, count + 1)
//     } else {
//       const count = rightCounts.get(g.color) || 0
//       rightCounts.set(g.color, count + 1)
//     }
//   })

//   for(const [color, leftCount] of leftCounts.entries()) {
//     const rightCount = rightCounts.get(color) || 0

//     const pairsToForm = Math.min(leftCount, rightCount)

//     for (let i = 0; i < pairsToForm; i++) {
//       result.push(color)
//     }
//   }

//   console.log(result)

//   return result
// }

// function matchGloves(gloves: Glove[]): string[] {

//   let singles: string[] = []
//   const result: string[] = []

//   function contrary(hand: 'L' | 'R') {
//     if(hand === 'L') return 'R'
//     if(hand === 'R') return 'L'
//   }

//   gloves.forEach(g => {
//     if(singles.includes(`${g.color}${contrary(g.hand)}`)) {
//       const index = singles.indexOf(`${g.color}${contrary(g.hand)}`)
//       singles.splice(index, 1)
//       result.push(g.color)
//     } else {
//       singles.push(`${g.color}${g.hand}`)
//     }
//   })

//   console.log(result)
//   return result
// }

const gloves2: Glove[] = [
  { hand: 'L', color: 'red' },
  { hand: 'R', color: 'red' },
  { hand: 'R', color: 'green' },
  { hand: 'L', color: 'blue' },
  { hand: 'L', color: 'green' }
]

matchGloves(gloves2)