const Blocos = require("./Blocos")
const FileHandler = require("./FileHandler")
const Botao = require("./Botao")
const fs = require('fs')
const ffmpeg = require('ffmpeg')

class GravadorAudio extends Blocos {

    constructor(options) {
        super(options)
        this.fileHandler = new FileHandler({
            directory: './gravs',
            fileName: 'grav',
            type: 'audio/webm',
            action: path => { this.onAudio(path, this) }
        })
        this.time = 0;
        this.recording = false
        this.criarGravadorAudio(options)
        if (options.load)
            this.load(options.load)
    }
    export() {

        this.exportData = {
            type: this.constructor.name,
        }
        return super.export()

    }

    load(data) {
    }

    onAudio(path, ref) {


    }
    setTemp() {

        let minutos = Math.floor(this.time / 60)
        let segundos = this.time % 60
        minutos = minutos.toString()
        segundos = segundos.toString()
        const setLen = str => {
            return str.length < 2 ? `0${str}` : str
        }
        minutos = setLen(minutos)
        segundos = setLen(segundos)
        this.temporizador.textContent = `${minutos}:${segundos}`

    }
    record(ref, e) {
        if (e.detail > 1) {
            return;
        }
        let image = ref.recordBt.image
        if (!this.recording) {
            this.recording = true
            this.interval = setInterval(() => {
                image.animate([{
                    opacity: "1"
                }, {
                    opacity: "0"
                }], 1000)

            }, 1000)

            this.temporizadorInterval = setInterval(() => {
                this.time++
                this.setTemp()

            }, 1000)
            this.mediaRecorder.state == 'paused' ? this.mediaRecorder.resume() : this.mediaRecorder.start()

        } else {
            this.recording = false
            clearInterval(this.interval)
            clearInterval(this.temporizadorInterval)
            this.mediaRecorder.pause()
        }

    }

    stopRecord(ref, path) {

        ref.container.removeChild(ref.recordBt.ref)
        ref.container.removeChild(ref.temporizador)
        ref.audio = document.createElement('audio')
        ref.audio.ondrag = e => e.preventDefault()
        ref.audio.setAttribute('controls', 'true')
        ref.addEstilo(ref.audio, {
            width: '100%',
            opacity: '1',
            transform: 'scale(1)'
        })
        ref.source = document.createElement('source')
        ref.source.setAttribute('src', path)
        ref.source.setAttribute('type', ref.fileHandler.type)
        ref.audio.appendChild(ref.source)
        ref.container.appendChild(ref.audio)
        ref.audio.animate([{
            opacity: '0',
            transform: 'scale(0.8)'
        }, {
            opacity: '1',
            transform: 'scale(1)'

        }], ref.animationTimes.medium)

    }

    criarGravadorAudio(options) {

        this.container = document.createElement('div')
        this.addEstilo(this.container, {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'

        })
        this.recordBt = new Botao({
            icon: "record",
            width: "3vw",
            height: "3vw",
            imageWidth: "30px",
            imageHeight: "32px",
            ref: this.container,
            animation: true,
            style: {
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginRight: '15px',
                flexShrink: "0",
                borderRadius: "50%",
                position: "relative",
                backgroundColor: "var(--cor-media)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
            },
            action: e => this.record(this, e),
            dbaction: () => this.mediaRecorder.stop()

        })
        this.temporizador = document.createElement('p')
        this.temporizador.textContent = `00:00`
        this.addEstilo(this.temporizador, {

            fontFamily: 'Roboto',
            fontSize: '22px',
            userSelect: 'none'

        })
        this.container.appendChild(this.temporizador)
        this.handleRecorder(this)
            .then(() => {

                this.addMainContent(this.container)

            })



    }

    handleRecorder(ref) {

        return new Promise((resolve, reject) => {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(stream => {

                    ref.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
                    // mediaRecorder.start()
                    // mediaRecorder.pause()

                    ref.audioChunks = []

                    ref.mediaRecorder.addEventListener("dataavailable", event => {
                        ref.audioChunks.push(event.data)
                    });

                    ref.mediaRecorder.addEventListener("stop", () => {
                        // const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        let reader = new FileReader();
                        reader.readAsDataURL(ref.audioChunks[0])
                        reader.onload = () => {
                            let base64 = reader.result.split(',')[1]
                            let buffer = Buffer.from(base64, 'base64'); // decode
                            let path = ref.fileHandler.countFiles('webm')
                            fs.writeFileSync(path, buffer)
                            ref.stopRecord(ref, path)
                        }

                    });
                    resolve()
                })

        })


    }



}

module.exports = GravadorAudio