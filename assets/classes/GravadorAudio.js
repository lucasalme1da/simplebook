const Blocos = require("./Blocos")
const FileHandler = require("./FileHandler")
const fs = require('fs')
const ffmpeg = require('ffmpeg')
class GravadorAudio extends Blocos {

    constructor(options) {
        super(options)
        this.fileHandler = new FileHandler({
            directory: './gravs',
            fileName: 'audio',
            type: 'audio/mp3',
            action: path => { this.onAudio(path, this) }
        })
        this.criarGravadorAudio(options)
    }

    onAudio(path, ref) {


    }

    criarGravadorAudio(options) {

        this.container = document.createElement('div')
        this.addEstilo(this.container, {

            width: '100%',
            height: '100%',
            border: '1px solid lightgray',
            borderRadius: '8px'

        })

        this.addMainContent(this.container)

        this.handleRecorder()

    }

    handleRecorder() {


        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(stream => {

                const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
                mediaRecorder.start()
                // mediaRecorder.pause()

                const audioChunks = []

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data)
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    // const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);

                    // fs.writeFileSync('test.webm', Buffer.from(new Uint8Array(audioBlob)))
                    // fs.writeFileSync('test.webm', audioBlob)
                    this.audio = document.createElement('audio')
                    this.audio.setAttribute('controls', 'true')
                    this.source = document.createElement('source')
                    this.source.setAttribute('src', './test.webm')
                    this.source.setAttribute('type', 'audio/webm')
                    this.audio.appendChild(this.source)
                    this.container.appendChild(this.audio)

                    const downloadEl = document.createElement('a');
                    downloadEl.innerHTML = 'download';
                    downloadEl.download = 'audio.webm';
                    downloadEl.href = audioUrl;
                    downloadEl.click()


                    const audio = new Audio(audioUrl);
                    audio.play();
                });

                setTimeout(() => {
                    mediaRecorder.stop();
                    console.log('recorded')
                }, 5000);
            })
    }



}

module.exports = GravadorAudio