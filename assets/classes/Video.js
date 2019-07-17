const Blocos = require("./Blocos")
const FileHandler = require("./FileHandler")

class Video extends Blocos {

    constructor(options) {
        super(options)
        this.criarVideo(options)
        this.fileHandler = new FileHandler({
            directory: './vids',
            fileName: 'video',
            type: 'video/mp4',
            action: path => { this.onVideo(path, this) }
        })

    }

    onVideo(path, ref) {

        ref.image.style.display = 'none'

        ref.video = document.createElement('video')
        ref.video.setAttribute('controls', 'true')
        ref.addEstilo(ref.video, {
            width: '100%',
            height: '100%',
            opacity: '1',
            transform: 'scale(1)'
        })
        ref.source = document.createElement('source')
        ref.source.setAttribute('src', path)
        ref.source.setAttribute('type', ref.fileHandler.type)
        ref.video.appendChild(ref.source)
        ref.container.appendChild(ref.video)
        ref.video.animate([{
            opacity: '0',
            transform: 'scale(0.8)'
        }, {
            opacity: '1',
            transform: 'scale(1)'

        }], ref.animationTimes.medium)
    }

    criarVideo(options) {
        this.container = document.createElement('div')
        this.addEstilo(this.container, {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            border: '1px solid lightgray',
            borderRadius: '8px'
        })

        this.image = document.createElement('img')
        this.image.ondrag = e => { e.preventDefault() }
        this.image.src = './assets/icons/vidDefault.svg'
        this.addEstilo(this.image, {
            width: '80%',
            height: '40%',
            cursor: 'pointer'
        })
        this.image.ondblclick = () => {
            this.fileHandler.file.click()
        }

        this.container.appendChild(this.image)
        this.addMainContent(this.container)

    }


}

module.exports = Video