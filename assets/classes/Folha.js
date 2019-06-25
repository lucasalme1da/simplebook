const Estilo = require("./Estilo")
const Blocos = require("./Blocos")
const Texto = require("./Texto")
const Imagem = require('./Imagem')
const Lista = require('./Lista')
const Tabela = require('./Tabela')
const { clipboard, Tray } = require('electron')
const fs = require('fs')
const { app, globalShortcut } = require('electron')

class Folha extends Estilo {
    constructor(options) {
        super()
        this.blocos = options.blocos || []
        this.folhaContainer = options.folhaContainer
        this.zIndexBlocoMin = 5
        this.zIndexBlocoMax = 300
        this.imageCount = -1
        this.loadedFonts = options.loadedFonts
        this.mouseX = 0
        this.mouseY = 0
        this.windowOnMouseMoveActions = []

        window.onkeydown = e => {
            if (e.ctrlKey && e.keyCode == 84) {
                const { x, y } = this.getMousePos(100, 50)
                this.criarTexto({
                    posX: x,
                    posY: y,
                    initialWidth: 100,
                    initialHeight: 50,
                })
            } else if (e.ctrlKey && e.keyCode == 73) {
                const { x, y } = this.getMousePos(400, 400)
                this.criarImagem({
                    posX: x,
                    posY: y,
                    initialWidth: 400,
                    initialHeight: 400,
                })
            } else if (e.ctrlKey && e.keyCode == 76) {
                const { x, y } = this.getMousePos(400, 400)
                this.criarLista({
                    posX: x,
                    posY: y,
                    initialWidth: 400,
                    initialHeight: 400,
                })
            } else if (e.ctrlKey && e.keyCode == 71) {
                const { x, y } = this.getMousePos(400, 400)
                this.criarTabela({
                    posX: x,
                    posY: y,
                    initialWidth: 400,
                    initialHeight: 400,
                })

            }
        }

        this.addWindowMouseMoveAction(e => {

            this.mouseX = e.clientX
            this.mouseY = e.clientY
        })

        this.folhaContainer.onpaste = e => {

            const image = clipboard.readImage()
            this.countImgs()

            if (!image.isEmpty()) {
                const { height, width } = image.getSize()
                let x = this.mouseX - this.folhaContainer.offsetLeft - (width / 2)
                let y = this.mouseY - this.folhaContainer.offsetTop - (height / 2)
                fs.writeFileSync(`./imgs/Imagem-${this.imageCount + 1}.jpg`, image.toJPEG(100))
                this.criarImagem({
                    posX: x,
                    posY: y,
                    initialWidth: width,
                    initialHeight: height,
                    src: `Imagem-${this.imageCount + 1}.jpg`
                })

            }
        }

        // this.criarImagem({
        //     posX: 100,
        //     posY: 100,
        // })
        // this.criarLista({
        //     posX: 100,
        //     posY: 100,
        // })
        this.criarTabela({
            posX: 200,
            posY: 200,
            initialHeight: 400,
            initialWidth: 500
        })

    }

    getMousePos(width, height) {
        let x = this.mouseX - this.folhaContainer.offsetLeft - (width / 2)
        let y = this.mouseY - this.folhaContainer.offsetTop - (height / 2)
        return { x, y }
    }

    removeWindowMouseMoveAction(ind) {
        this.windowOnMouseMoveActions.splice(ind, 1)

    }

    addWindowMouseMoveAction(action) {
        this.windowOnMouseMoveActions.push(action)
        window.onmousemove = e => {
            this.windowOnMouseMoveActions.forEach(action => {
                action(e)
            })
        }
        return this.windowOnMouseMoveActions.length - 1
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

    criarTabela(options) {

        this.blocos.push(
            new Tabela({
                folhaContainer: this.folhaContainer,
                posX: `${options.posX}px`,
                posY: `${options.posY}px`,
                loadedFonts: this.loadedFonts,
                initialHeight: options.initialHeight,
                initialWidth: options.initialWidth,
                folha: this
            })
        )

    }
    criarLista(options) {
        this.blocos.push(
            new Lista({
                folhaContainer: this.folhaContainer,
                posX: `${options.posX}px`,
                posY: `${options.posY}px`,
                loadedFonts: this.loadedFonts,
                initialHeight: options.initialHeight,
                initialWidth: options.initialWidth,
                folha: this
            })
        )

    }

    criarTexto(options) {
        this.blocos.push(
            new Texto({
                folhaContainer: this.folhaContainer,
                posX: `${options.posX}px`,
                posY: `${options.posY}px`,
                loadedFonts: this.loadedFonts,
                initialHeight: options.initialHeight,
                initialWidth: options.initialWidth,
                folha: this
            })
        )
    }
    criarImagem(options) {
        this.blocos.push(
            new Imagem({
                folhaContainer: this.folhaContainer,
                posX: `${options.posX}px`,
                posY: `${options.posY}px`,
                initialHeight: options.initialHeight,
                initialWidth: options.initialWidth,
                src: options.src,
                folha: this
            })
        )

    }
    criarBloco(options) {
        this.blocos.push(
            new Blocos({
                folhaContainer: this.folhaContainer,
                posX: `${options.posX - this.folhaContainer.offsetWidth}px`,
                posY: `${options.posY - this.folhaContainer.offsetHeight}px`,
                folha: this
            })
        )
    }
    removeBloco(bloco) {
        let ind = this.blocos.findIndex(b => b.blocoRef == bloco.blocoRef)
        this.blocos.splice(ind, 1)
        console.log(this.blocos)
    }
    trazerFrente(bloco) {
        let ind
        let zindex = bloco.blocoRef.style.zIndex
        if (zindex + 1 != this.zIndexBlocoMax) zindex++
        this.blocos.forEach((bloc, index) => {
            if (bloc.blocoRef == bloco.blocoRef) {
                ind = index
            }
            let zIndex = bloc.blocoRef.style.zIndex
            if (zIndex - 1 != this.zIndexBlocoMin) {
                bloc.blocoRef.style.zIndex = zIndex - 1
            }
        })

        this.blocos[ind].blocoRef.style.zIndex = zindex
    }
}

module.exports = Folha
