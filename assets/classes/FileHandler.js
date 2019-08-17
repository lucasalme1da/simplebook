const fs = require('fs')

class FileHandler {

    constructor(options) {
        this.filesCount = -1
        this.directory = options.directory || './imgs'
        this.fileName = options.fileName || 'image'
        this.type = options.type || 'image/*'
        this.createFilesDirectory()
        this.criarFile(options)

    }
    criarFile(options) {

        this.file = document.createElement('input')
        this.file.setAttribute('type', 'file')
        this.file.setAttribute('accept', this.type)
        this.file.onchange = () => {
            if (this.file.files[0].type == this.type) {
                this.copyFile(this.file.files[0])
                    .then(type => {
                        this.filesCount++
                        options.action(`${this.directory}/${this.fileName}-${this.filesCount}.${type}`)
                    })
                    .catch(erro => {
                        console.log(erro)
                    })

            }

        }

    }


    createFilesDirectory() {
        try {
            if (!fs.existsSync(this.directory)) {
                fs.mkdirSync(this.directory);
            }
        }
        catch (erro) {
            console.log(erro)
        }
    }
    countFiles(file) {
        let files = fs.readdirSync(this.directory)
        if (files.length > 0) {
            let filesNumber = files.map(file => parseInt(file.split('-')[1]))
            this.filesCount = Math.max(...filesNumber)

        } else {
            this.filesCount = 0
        }
        if (file) {

            return `${this.directory}/${this.fileName}-${this.filesCount + 1}.${file}`
        }

    }
    copyFile(file) {

        return new Promise((resolve, reject) => {
            let [name, type] = file.name.split('.')
            if (this.filesCount == -1) {

                this.countFiles()
            }
            fs.copyFile(file.path, `${this.directory}/${this.fileName}-${this.filesCount + 1}.${type}`, (erro) => {
                if (erro) reject(erro);
                resolve(type)
            });

        })

    }

}

module.exports = FileHandler