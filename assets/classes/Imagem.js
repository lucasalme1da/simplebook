const Blocos = require('./Blocos')
const fs = require('fs')

class Imagem extends Blocos {

    constructor(options) {
        super(options)
        this.imagesDirectory = './imgs'
        this.imageCount = -1
        this.src = options.src ? options.src : null
        this.createFilesDirectory()
        this.criarImagem()

    }
    export() {

        this.exportData = {
            type: this.constructor.name,
            src: this.src
        }
        return super.export()
    }

    createFilesDirectory() {
        try {
            if (!fs.existsSync(this.imagesDirectory)) {
                fs.mkdirSync(this.imagesDirectory);
            }
        }
        catch (erro) {
            console.log(erro)
        }
    }

    countImgs() {

        let images = fs.readdirSync('./imgs')
        if (images.length > 0) {
            let imagesNumber = images.map(image => parseInt(image.split('-')[1]))
            this.imageCount = Math.max(...imagesNumber)

        } else {
            this.imageCount = 0
        }

    }

    copyImg(file) {

        if (this.imageCount == -1) {

            this.countImgs()
        }
        return new Promise((resolve, reject) => {
            let [name, type] = file.name.split('.')
            fs.copyFile(file.path, `imgs/imagem-${this.imageCount + 1}.${type}`, (erro) => {
                if (erro) reject(erro);
                resolve(type)
            });

        })

    }
    criarImagem() {

        this.imagem = document.createElement('img')
        this.imagem.ondrag = e => {
            e.preventDefault()
        }
        this.imagem.setAttribute('draggable', 'false')
        this.file = document.createElement('input')
        this.file.setAttribute('type', 'file')
        this.src ? this.imagem.setAttribute('src', `./imgs/${this.src}`) : this.imagem.setAttribute('src', './assets/icons/imgDefaultFinal.svg')
        this.file.setAttribute('accept', 'image/*')
        this.addEstilo(this.imagem, {
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            border: '1px solid lightgray'
        })
        this.imagem.onload = () => {
            let anim = this.imagem.animate([{

                transform: 'scale(0.8)',
                opacity: '0'
            }, {
                transform: 'scale(1)',
                opacity: '1'

            }], this.animationTimes.slow)
        }
        this.file.onchange = () => {
            console.log(this.file.files[0].type.split('/')[0])
            if (this.file.files[0].type.split('/')[0] == 'image') {
                this.copyImg(this.file.files[0])
                    .then(type => {
                        this.imageCount++
                        this.imagem.setAttribute('src', `./imgs/imagem-${this.imageCount}.${type}`)
                    })
                    .catch(erro => {
                        console.log(erro)
                    })

            }

        }
        this.imagem.ondblclick = () => {
            this.file.click()
        }

        this.addMainContent(this.imagem)


    }

}

module.exports = Imagem 