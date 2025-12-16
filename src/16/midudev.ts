type Gifts = number[]
type MaxWeight = number
type Result = number | null

function packGifts(gifts: Gifts, maxWeight: MaxWeight): Result {
  if(gifts.length === 0) {
    return 0
  }

  let sleds: Result = 0
  let sledWeight = 0

  for(let gift of gifts) {
    if(gift > maxWeight) {
      return null
    }
  
    if (gift + sledWeight > maxWeight) {
      sleds++
      sledWeight = gift
    } else if (gift + sledWeight === maxWeight) {
      sleds++
      sledWeight = 0
    } else {
      sledWeight += gift
    }
  }

  if(sledWeight > 0) {
    sleds++
  }
  
  console.log(sleds)
  return sleds
}

// packGifts([2, 3, 4, 1], 5)
// 2 trineos
// Trineo 1: 2 + 3 = 5
// Trineo 2: 4 + 1 = 5

// packGifts([3, 3, 2, 1], 3)
// 3 trineos
// Trineo 1: 3
// Trineo 2: 3
// Trineo 3: 2 + 1 = 3

// packGifts([1, 1, 1, 1], 2)
// 2 trineos
// Trineo 1: 1 + 1 = 2
// Trineo 2: 1 + 1 = 2

console.log(packGifts([5, 6, 1], 5))
// null
// Hay un regalo de peso 6 que no cabe

// packGifts([], 10)
// 0 trineos
// No hay regalos que entregar