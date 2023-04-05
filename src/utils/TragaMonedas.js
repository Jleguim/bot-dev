const events = require('events')

class TragaMonedas {
  eventEmitter = new events.EventEmitter()
  poolSize = 18 * 3
  symbols = {
    '🦊': { isWild: true, mult: 5 },
    '💰': { isWild: false, mult: 2.3 },
    '🍇': { isWild: false, mult: 1.5 },
    '🍒': { isWild: false, mult: 1.2 },
    '🍋': { isWild: false, mult: 1.1 }
  }

  calculateCombos() {
    var combos = {}
    for (var symbol in this.symbols) {
      var data = this.symbols[symbol]
      combos[symbol.repeat(3)] = data.mult
      if (!data.isWild) continue

      for (var symbol1 in this.symbols) {
        if (symbol == symbol1) continue
        var data1 = this.symbols[symbol1]
        combos[`${symbol1.repeat(2)}${symbol}`] = data1.mult
        combos[`${symbol}${symbol1.repeat(2)}`] = data1.mult
        combos[`${symbol1}${symbol}${symbol1}`] = data1.mult

        combos[`${symbol.repeat(2)}${symbol}`] = data1.mult
        combos[`${symbol1}${symbol.repeat(2)}`] = data1.mult
        combos[`${symbol}${symbol1}${symbol}`] = data1.mult
      }
    }
    return combos
  }

  play() {
    var pool = this.generateSymbolPool()
    var reels = this.feedReels(pool)
    this.rollMachine(reels)
  }

  checkWinnings(combo) {
    // console.log(`\n-> ${combo}`)
    var combosDictionary = this.calculateCombos()
    var combos = Object.keys(combosDictionary)

    var won = combos.includes(combo)
    this.eventEmitter.emit('finished', won, combosDictionary[combo])

    // if (!won) console.log('You lost lol')
    // else console.log(`you won x${combosDictionary[combo]}`)
  }

  displayMachine(topRow, middleRow, bottomRow) {
    // console.log('\x1B[2J\x1B[3J\x1B[H\x1Bc')
    // console.log(`-${topRow}-\n>${middleRow}<\n-${bottomRow}-`)
    this.eventEmitter.emit('display', topRow, middleRow, bottomRow)
  }

  rollMachine(reels) {
    var currentIndex = 0
    var nextIndex = 1
    var prevIndex = reels[0].length - 1

    var i = 0
    var intervalo = setInterval(() => {
      var topRow = reels.map(r => (r = r[prevIndex])).join('')
      var middleRow = reels.map(r => (r = r[currentIndex])).join('')
      var bottomRow = reels.map(r => (r = r[nextIndex])).join('')

      this.displayMachine(topRow, middleRow, bottomRow)

      var newNext = currentIndex == reels[0].length - 1 ? 0 : currentIndex + 1
      prevIndex = currentIndex
      currentIndex = nextIndex
      nextIndex = newNext
      i++

      if (i > 5) {
        clearInterval(intervalo)
        this.checkWinnings(middleRow)
      }
    }, 500)
  }

  randomIndexFromArray(array) {
    return Math.floor(Math.random() * array.length)
  }

  wait(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeout)
    })
  }

  feedReels(symbolPool) {
    let symbolsPerReel = this.poolSize / 3
    return [
      symbolPool.slice(0, symbolsPerReel),
      symbolPool.slice(symbolsPerReel, symbolsPerReel * 2),
      symbolPool.slice(symbolsPerReel * 2, symbolsPerReel * 3)
    ]
  }

  generateSymbolPool() {
    let symbols = Object.keys(this.symbols)
    let pool = []

    for (let n = 0; n < this.poolSize; n++) {
      let randomIndex = this.randomIndexFromArray(symbols)
      pool.push(symbols[randomIndex])
    }

    return pool
  }
}

module.exports = TragaMonedas
