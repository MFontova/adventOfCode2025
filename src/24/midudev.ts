function isTreesSynchronized(
  tree1: { value: string; left?: any; right?: any } | undefined,
  tree2: { value: string; left?: any; right?: any } | undefined
): [boolean, string] {

  const mainStart = tree1!.value

  function recursive(
    tree1: { value: string; left?: any; right?: any } | undefined,
    tree2: { value: string; left?: any; right?: any } | undefined
  ): boolean {
    console.log(tree1?.value, tree2?.value)
  
    if(tree1!.value !== tree2!.value) {
      return false
    }
  
    if(tree1!.left !== undefined && tree2!.right !== undefined && tree1!.right !== undefined && tree2!.left !== undefined) {
      return recursive(tree1!.left, tree2!.right) && recursive(tree1!.right, tree2!.left)
    }

    return true
  }

  return [recursive(tree1, tree2), mainStart]

}

const tree1 = {
  value: '🎄',
  left: { value: '⭐' },
  right: { value: '🎅' }
}

const tree2 = {
  value: '🎄',
  left: { value: '🎅' },
  right: { value: '⭐' }
}

console.log(isTreesSynchronized(tree1, tree2)) // [true, '🎄']