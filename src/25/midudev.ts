function execute(code: string): number {
  let value = 0

  recursiveExecution(code)

  function recursiveExecution(subCode: string) {
    for (let i = 0; i < subCode.length; i++) {
      const element = subCode[i];
      if(element === '+') {
        value++
      }
      if(element === '-') {
        value--
      }
      if(element === '[') {
        const closeIndex = subCode.slice(i).indexOf(']') + i
        const substring = subCode.substring(i + 1, closeIndex)
        while (value !== 0) {
          recursiveExecution(substring)
        }
        i = closeIndex
      }
      if(element === '{') {
        const closeIndex = subCode.slice(i).indexOf('}') + i
        const substring = subCode.substring(i + 1, closeIndex)
        if(value !== 0) {
          recursiveExecution(substring)
        }
        i = closeIndex
      }
    }
  }
  console.log(value)
  return value
}

execute('+++') // 3
execute('+--') // -1
execute('>+++[-]') // 0
execute('>>>+{++}') // 3
execute('+{[-]+}+') // 2
execute('{+}{+}{+}') // 0
execute('------[+]++') // 2
execute('-[++{-}]+{++++}') // 5