class GBnoiseLFSR {
  constructor () {
    this.init()
  }

  init () {
    this.tap = 1
    this.register = 1
  }

  next () {
    const bitA = this.register & 1
    const bitB = (this.register >> this.tap) & 1
    const feedback = (bitA ^ bitB) << 14
    this.register >>= 1
    this.register |= feedback
  }

  read () {
    return this.register >> 11
  }

}

export default GBnoiseLFSR
