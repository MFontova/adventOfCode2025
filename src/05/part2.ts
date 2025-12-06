import { getInput } from "../file_reader"

function fresh() {
  const input = getInput('05', false)
  const [ranges, ingredients] = input.split('\r\n\r\n').map(part => part.split('\r\n'))

  const splitRanges = ranges.map(r => r.split('-')).map(range => range.map(e => Number(e))).sort((a,b) => a[0] - b[0])

  const joinedSplitRanges: number[][] = [splitRanges[0]]

  let total = 0

  console.log(splitRanges)

  for (let i = 1; i < splitRanges.length; i++) {
    const currRange = splitRanges[i];
    const lastJoined = joinedSplitRanges[joinedSplitRanges.length - 1];
    
    if(currRange[1] < lastJoined[1]) {
      continue
    }
    if(currRange[0] <= lastJoined[1]) {
      joinedSplitRanges[joinedSplitRanges.length - 1] = [lastJoined[0], currRange[1]]
    } else {
      joinedSplitRanges.push([currRange[0], currRange[1]])
    }
  }

  console.log(joinedSplitRanges)

  joinedSplitRanges.forEach(range => {
    total += range[1] - range[0] + 1
  })

  console.log(total)
}

fresh()