const Blocos = require("./Blocos")
const Botao = require("./Botao")
const FileHandler = require("./FileHandler")

class Audio extends Blocos {

    constructor(options) {
        super(options)
        this.criarAudio(options)
        this.playing = false
        this.fileHandler = new FileHandler({
            directory: './auds',
            fileName: 'audio',
            type: 'audio/mp3',
            action: path => { this.onAudio(path, this) }
        })
        if (options.load)
            this.load(options.load)
    }
    export() {

        this.exportData = {
            type: this.constructor.name,
            src: this.source.getAttribute('src'),
            time: this.audio.currentTime.toFixed(2)
        }
        return super.export()

    }

    load(data) {
        this.onAudio(data.src, this)
        this.audio.currentTime = data.time
    }

    onAudio(path, ref) {
        ref.image.style.display = 'none'
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

    criarAudio(options) {

        this.container = document.createElement('div')
        this.container.ondrag = e => e.preventDefault()
        this.addEstilo(this.container, {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        })

        this.image = document.createElement('img')
        this.image.ondrag = e => { e.preventDefault() }
        this.image.src = './assets/icons/audDefault.svg'
        this.addEstilo(this.image, {
            width: '80%',
            height: '80%',
            cursor: 'pointer'
        })
        this.image.ondblclick = () => {
            this.fileHandler.file.click()
        }

        this.container.appendChild(this.image)
        this.addMainContent(this.container)
    }


}

module.exports = Audio