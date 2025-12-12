/**
 * Figure rotations
 * @param figure The figure that will be rotated
 * @returns Array with the 4 positions of the figure
 */
function getFigureRotations(figure: Array<Array<string>>): Array<Array<Array<string>>> {
  const figures: Array<Array<Array<string>>> = [figure]
  const figureRows = figure.length
  const figureCols = figure[0].length

  while (figures.length < 4) {
    const fromFigure = figures[figures.length - 1]
    const newFigure = Array.from({length: figureCols}, () => Array.from({length: figureRows}, () => '.'))
    for (let i = 0; i < figureRows; i++) {
      for (let j = 0; j < figureCols; j++) {
        const element = fromFigure[i][j];
        
        newFigure[j][figureCols - 1 - i] = element
      }
    }
    figures.push(newFigure)
  }

  return figures
}

const figure = [
  ['#', '#', '.'],
  ['#', '.', '.'],
  ['#', '#', '.'],
]

const region = [
  ['.','.','.','.'],
  ['.','.','.','.'],
  ['.','.','.','.'],
  ['.','.','.','.'],
]
// getFigureRotations(figure)

/**
 * @param figure The figure to check if it fits
 * @param region The region where figure will fit
 */
function figureFitsInRegion(figure: Array<Array<string>>, region: Array<Array<string>>) {
  let fits = false

  let newRegion = region
  // loop region
  for (let regionI = 0; regionI < region.length; regionI++) {
    for (let regionJ = 0; regionJ < region[regionI].length; regionJ++) {
      const regionElement = region[regionI][regionJ];
      if(!fits) {
        if(regionElement === '.') {
          
          // loop element
          for (let figureI = 0; figureI < figure.length; figureI++) {
            for (let figureJ = 0; figureJ < figure[figureI].length; figureJ++) {
              const element = figure[figureI][figureJ];
              if(element === '#') {
                const elementPositionI = regionI + figureI
                const elementPositionJ = regionJ + figureJ
  
                if(elementPositionI >= 0 && elementPositionI < region.length && elementPositionJ >= 0 && elementPositionJ < region[0].length) {
                  newRegion[regionI + figureI][regionJ + figureJ] = element
                  fits = true
                  break
                }
              }
            }
          }
        } else {
          fits = false
        }
      }
    }
  }
  console.log('newRegion', newRegion)
}

figureFitsInRegion(figure, region)