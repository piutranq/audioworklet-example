function initAudioContext (moduleList) {
  const audioContext = new AudioContext()
  return Promise.all(moduleList.map(
    entry => audioContext.audioWorklet.addModule(entry)
  )).then(() => audioContext)
}

let audioContext
const playButton = document.querySelector('#playButton')

playButton.addEventListener('click', async () => {
  if (playButton.classList.contains('audio-playing')) {
    // the audio context is playing
    await audioContext.suspend()
    playButton.classList.replace('audio-playing', 'audio-paused')
    playButton.classList.replace('fa-pause', 'fa-play')
  } else if (playButton.classList.contains('audio-paused')) {
    // the audio context is paused
    await audioContext.resume()
    playButton.classList.replace('audio-paused', 'audio-playing')
    playButton.classList.replace('fa-play', 'fa-pause')
  } else {
    // no audio context
    audioContext = await initAudioContext(['js/audioWorklet.bundled.js'])
    const customNode = new AudioWorkletNode(audioContext, 'customProcessor')
    customNode.connect(audioContext.destination)
    playButton.classList.add('audio-playing')
    playButton.classList.replace('fa-play', 'fa-pause')
  }
})
