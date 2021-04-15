class GBnoiseLFSR {
  constructor () {
    this.init()
  }

  init () {
    this.tap = 1
    this.register = 1
  }

  set mode (value) {
    value === 0 ? this.tap = 1 : this.tap = 6
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

class GBnoiseGenerator extends AudioWorkletProcessor {
  constructor () {
    super()
    this.lfsr = new GBnoiseLFSR()
  }

  static get parameterDescriptors () {
    return [
      {
        name: 'freq',
        minValue: 1,
        maxValue: 1048576,
        defaultValue: 32768
      },
      {
        name: 'mode',
        minValue: 0,
        maxValue: 1,
        defaultValue: 1,
      },
      {
        name: 'gain',
        minValue: 0,
        maxValue: 1,
        defaultValue: 0.25
      }
    ]
  }

  clock (sampleCount, freq) {
    const ratio = freq / sampleRate
    const intPart = Math.floor(ratio)

    const divisible = sampleCount % (1 / (ratio - intPart)) < 1
    const repeat = divisible ? intPart + 1 : intPart

    for (let i = 0; i < repeat; i++) {
      this.lfsr.next()
    }
  }

  process (inputs, outputs, params) {
    const newOutputSamples = []

    // Generate the noise waveform from lfsr
    for (let i = 0; i < 128; i++) {
      const gain = (params.gain.length === 1) ? params.gain[0] : params.gain[i]
      const freq = (params.freq.length === 1) ? params.freq[0] : params.freq[i]
      const mode = (params.mode.length === 1) ? params.mode[0] : params.mode[i]

      this.clock(currentFrame + i, freq)
      const hex = this.lfsr.read()
      const sample = ((hex - 7.5) / 7.5) * gain
      newOutputSamples[i] = sample
    }

    // Send the generated waveform to output channel
    for (let num = 0; num < outputs.length; num++) {
      for (let ch = 0; ch < outputs[num].length; ch++) {
        for (let i = 0; i < outputs[num][ch].length; i++) {
          outputs[num][ch][i] = newOutputSamples[i]
        }
      }
    }

    return true
  }
}

registerProcessor('customProcessor', GBnoiseGenerator)
