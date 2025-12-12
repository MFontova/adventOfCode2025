type Gift = string | number | boolean
type Workshop = Record<string, any>
type Path = string[]

function findGiftPath(workshop: Workshop, gift: Gift): Path {
  
  function recursive(currentLevel: Workshop, gift: Gift, path: Path): Path {
    for (const key in currentLevel) {
      if(!currentLevel.hasOwnProperty(key)) continue;
      const value = currentLevel[key]

      if(value === gift) {
        return [...path, key]
      }
      if(typeof value === 'object') {
        const newPath = [...path, key]
        const resultPath = recursive(value, gift, newPath)

        if(resultPath.length > 0) {
          return resultPath
        }
      }
    }
    return []
  }

  return recursive(workshop, gift, [])
}

// function findGiftPath(workshop: Workshop, gift: Gift): Path {

//   let result: Path = []

//   Object.keys(workshop).forEach(k => {
//     console.log('k', k)
//     if(typeof k === 'string' && workshop[k].toString() === gift.toString()) {
//       result = [k]
//     } else if(typeof workshop[k] !== 'string') {
//       Object.keys(workshop[k]).forEach(subK => {
//         console.log('subK', subK)
//         if(typeof subK === 'string' && workshop[k][subK].toString() === gift.toString()) {
//           result = [k, subK]
//         } else if(typeof workshop[k][subK] !== 'string') {
//           Object.keys(workshop[k][subK]).forEach(subSubK => {
//             console.log('subSubK', subSubK)
//             if(typeof subSubK === 'string' && workshop[k][subK][subSubK].toString() == gift.toString()) {
//               console.log('found')
//               result = [k, subK, subSubK]
//             }
//           })
//         }
//       })
//     }
//   })

//   console.log(result)
//   return result
// }

const workshop = {
  ok: true,
  nested: {
    nope: false,
    extra: {
      is: 0
    }
  }
}

console.log(findGiftPath(workshop, false))

// const workshop = {
//   storage: {
//     shelf: {
//       box1: 'train',
//       box2: 'switch'
//     },
//     box: 'car'
//   },
//   gift: 'doll'
// }

// findGiftPath(workshop, 'train')
// // ➜ ['storage', 'shelf', 'box1']

// findGiftPath(workshop, 'switch')
// // ➜ ['storage', 'shelf', 'box2']

// findGiftPath(workshop, 'car')
// // ➜ ['storage', 'box']

// findGiftPath(workshop, 'doll')
// // ➜ ['gift']

// findGiftPath(workshop, 'plane')
// // ➜ []