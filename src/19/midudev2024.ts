function distributeWeight(weight: number): string {
  const boxRepresentations: Record<number, string[]> = {
    1: [" _ ", "|_|"] ,
    2: [" ___ ", "|___|"],
    5: [" _____ ", "|     |", "|_____|"],
    10: [" _________ ", "|         |", "|_________|"]
  }

  const boxesWeights = Object.keys(boxRepresentations).map(b => Number(b)).reverse()

  let currentWeight = 0
  const usedBoxes: number[] = []
  while(currentWeight !== weight) {
    for(let box of boxesWeights) {
      if(box <= weight - currentWeight) {
        currentWeight += box
        usedBoxes.push(box)
        break
      }
    }
  }

  const boxes: string[][] = []
  for(let usedBox of usedBoxes.reverse()) {
    const boxRep = boxRepresentations[usedBox]
    
    boxes.push(boxRep)
  }

  const lines: string[] = []

  for (let box = 0; box < boxes.length; box++) {
    for (let line = 0; line < boxes[box].length; line++) {
      const element = boxes[box][line];
      if(box > 0 && line === 0) {
        let lastLine = lines.pop()
        const replacedNextLine = element.replace(element.substring(0, lastLine!.length), lastLine!)
        lines.push(replacedNextLine)
      } else {
        lines.push(element)
      }
    }
  }

  console.log(lines.join('\n'))
  return lines.join('\n');
}

distributeWeight(58)