function maxDepth (s: string): number {
  let currentCount = 0
  let maxDepth = 0

  for (let i = 0; i < s.length; i++) {
    const element = s[i];
    if(element === '[') {
      currentCount++
    }
    if(element === ']') {
      currentCount--
    }

    if(currentCount < 0) {
      return -1
    }
    maxDepth = Math.max(maxDepth, currentCount)
  }


  if(currentCount !== 0) {
    return - 1
  }

  return maxDepth
}

// console.log(maxDepth('[]')) // -> 1
// console.log(maxDepth('[[]]')) // -> 2
// console.log(maxDepth('[][]')) // -> 1
// console.log(maxDepth('[[][]]')) // -> 2
// console.log(maxDepth('[[[]]]')) // -> 3
// console.log(maxDepth('[][[]][]')) // -> 2

// console.log(maxDepth('][')) // -> -1 (cierra antes de abrir)
// console.log(maxDepth('[[[')) // -> -1 (faltan cierres)
// console.log(maxDepth('[]]]')) // -> -1 (sobran cierres)
console.log(maxDepth('[][][')) // -> -1 (queda uno sin cerrar)