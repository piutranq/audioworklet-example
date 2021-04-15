function initAudioContext (moduleList) {
  const audioContext = new AudioContext()
  return Promise.all(moduleList.map(
    entry => audioContext.audioWorklet.addModule(entry)
  )).then(() => audioContext)
}

let audioContext
const playButton = document.querySelector('#playButton')

playButton.addEventListener('click', async () => {

  // the audio context is playing
  if (playButton.classList.contains('audio-playing')) {
    await audioContext.suspend()
    playButton.classList.replace('audio-playing', 'audio-paused')
    playButton.classList.replace('fa-pause', 'fa-play')
  }

  // the audio context is paused
  else if (playButton.classList.contains('audio-paused')) {
    await audioContext.resume()
    playButton.classList.replace('audio-paused', 'audio-playing')
    playButton.classList.replace('fa-play', 'fa-pause')
  }

  // no audio context
  else {
    audioContext = await initAudioContext(['js/processor.js'])
    const customNode = new AudioWorkletNode(audioContext, 'customProcessor')
    customNode.connect(audioContext.destination)
    playButton.classList.add('audio-playing')
    playButton.classList.replace('fa-play', 'fa-pause')
  }

})
