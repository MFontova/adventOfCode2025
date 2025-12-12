function elfBattle(elf1: string, elf2: string): number {
  let elf1Life = 3
  let elf2Life = 3
  let result = 0
  
  const combinations = {
    AA: [-1,-1],
    AB: [0,0],
    AF: [-2,-1],
    BA: [0,0],
    BB: [0,0,],
    BF: [-2,0],
    FA: [-1,-2],
    FB: [0,-2],
    FF: [-2,-2],
  }

  for (let i = 0; i < elf1.length; i++) {
    const elf1Movement = elf1[i];
    const elf2Movement = elf2[i];

    const movementString = elf1Movement + elf2Movement

    //AA, AB, AF, BA, BB, BF, FA, FB, FF

    const [damageElf1, damageElf2] = combinations[movementString as keyof typeof combinations]

    elf1Life += damageElf1
    elf2Life += damageElf2

    if(elf1Life <= 0 || elf2Life <= 0) {
      break
    }
  }

  if(elf1Life > elf2Life) {
    result = 1
  } else if(elf2Life > elf1Life) {
    result = 2
  }

  console.log('result', result)
  return result
}

// elfBattle('A', 'B')
// Ronda 1: A vs B -> Elfo 2 bloquea
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 3 de vida
// → 0

// elfBattle('F', 'B')
// Ronda 1: F vs B -> Elfo 2 recibe 2 de daño (F no se bloquea)
// Resultado: Elfo 1 = 3 de vida
//            Elfo 2 = 1 de vida
// → 1

// elfBattle('AAB', 'BBA')
// R1: A vs B → Elfo 2 bloquea
// R2: A vs B → Elfo 2 bloquea
// R3: B vs A → Elfo 1 bloquea
// Resultado: Elfo 1 = 3, Elfo 2 = 3
// → 0

elfBattle('AFA', 'BBA')
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1
// Resultado: Elfo 1 = 2, Elfo 2 = 0
// → 1

// elfBattle('AFAB', 'BBAF')
// R1: A vs B → Elfo 2 bloquea
// R2: F vs B → Elfo 2 recibe 2 de daño (F no se bloquea)
// R3: A vs A → ambos -1 → Elfo 2 llega a 0 ¡Batalla termina!
// R4: no se juega, ya que Elfo 2 no tiene vida
// → 1

// elfBattle('AA', 'FF')
// R1: A vs F → Elfo 1 -2, Elfo 2 -1
// R2: A vs F → Elfo 1 -2, Elfo 2 -1 → Elfo 1 llega a -1
// → 2