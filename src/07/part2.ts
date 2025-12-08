import { getInput } from "../file_reader"

function splitter() {
  const rawInput = getInput('07', false)
  const input = rawInput.split('\r\n')

  const rows = input.length
  const cols = input[0].length

  const dp: bigint[][] = Array(rows).fill(0).map(() => Array(cols).fill(0n))

  const startIndex = input[0].indexOf('S')

  dp[0][startIndex] = 1n

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols; c++) {
      const currentTimelines = dp[r][c]

      if(currentTimelines === 0n) continue

      const nextRow = r + 1
      const nextChar = input[nextRow][c]

      if(nextChar === '^') {
        const cLeft = c - 1
        if(cLeft >= 0) {
          dp[nextRow][cLeft] += currentTimelines
        }

        const cRight = c + 1
        if(cRight < cols) {
          dp[nextRow][cRight] += currentTimelines
        }
      } else {
        dp[nextRow][c] += currentTimelines
      }
    }    
  }


  const finalcounter = dp[dp.length - 1].reduce((acc, curr) => acc + curr)
  console.log(finalcounter)
}

splitter()