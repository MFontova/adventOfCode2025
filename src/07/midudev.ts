function drawTree(height: number, ornament: string, frequency: number): string {
  let tree = ''
  const maxWidth = (height * 2) - 1

  const pattern = '*'.repeat(frequency - 1) + ornament

  for (let i = 0; i < height; i++) {
    const level = '*'.repeat(((i + 1) * 2) - 1)
    const levelWithPad = level.padStart(level.length + height - i - 1, ' ')
    tree += levelWithPad
    tree += '\n'
  }

  tree += '#'.padStart(height, ' ')
  console.log(tree)

  let decoratedTree = ''

  let counter = 0
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i];
    if(element === '*') {
      decoratedTree += pattern[counter % pattern.length]
      counter++
    } else {
      decoratedTree += tree[i]
    }
  }

  console.log(decoratedTree)

  return decoratedTree
}

drawTree(5, 'o', 2)