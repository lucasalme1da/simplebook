const Estilo = require("./Estilo")
const Blocos = require("./Blocos")
const Texto = require("./Texto")
const Imagem = require("./Imagem")
const Lista = require("./Lista")
const Tabela = require("./Tabela")
const Audio = require("./Audio")
const Video = require("./Video")
const GravadorAudio = require("./GravadorAudio")

const { clipboard, Tray } = require("electron")
const fs = require("fs")
const { app, globalShortcut } = require("electron")

class Folha extends Estilo {
  constructor(options) {
    super()
    this.blocos = []
    this.folhaContainer = options.folhaContainer
    this.height = options.height ? options.height : 1095
    this.zIndexBlocoMin = 5
    this.zIndexBlocoMax = 300
    this.imageCount = -1
    this.loadedFonts = options.loadedFonts
    this.mouseX = 0
    this.mouseY = 0
    this.scrollPadding = 20
    this.scrollAdd = 200
    this.windowOnMouseMoveActions = []

    let length = options.blocos ? options.blocos.length : null

    if (length > 0) {
      options.blocos.forEach(bloco => {
        this.loadBloco(bloco)
      })
    }
  }
  load(blocos) {
    blocos.forEach(bloco => {

      this.criarBloco(bloco)
    })
  }

  export() {
    let exportBlocos = []
    this.blocos.forEach(bloco => {
      exportBlocos.push(bloco.export())
    })

    console.log("blocos", exportBlocos)

    return {
      name: this.navTab.text.textContent,
      height: this.height,
      exportBlocos
    }
  }
  setPageHeight() {
    this.folhaContainer.style.height = this.reparsePx(this.height)
  }
  removeWindowMouseMoveAction(ind) {
    return this.navTab.navbar.removeWindowMouseMoveAction(ind)
  }

  addWindowMouseMoveAction(action) {

    return this.navTab.navbar.addWindowMouseMoveAction(action)
  }

  countImgs() {
    let images = fs.readdirSync("./imgs")
    if (images.length > 0) {
      let imagesNumber = images.map(image => parseInt(image.split("-")[1]))
      this.imageCount = Math.max(...imagesNumber)
    } else {
      this.imageCount = 0
    }
  }


  criarBloco(options) {

    let defaultOptions = {
      folhaContainer: this.folhaContainer,
      posX: `${options.posX}px`,
      posY: `${options.posY}px`,
      loadedFonts: this.loadedFonts,
      initialHeight: options.initialHeight || options.height,
      initialWidth: options.initialWidth || options.width,
      src: options.src,
      folha: this,
      load: options.load,
    }

    switch (options.type) {
      case 'Texto':
        this.blocos.push(new Texto(defaultOptions))
        break
      case 'Imagem':
        this.blocos.push(new Imagem(defaultOptions))
        break

      case 'Tabela':
        this.blocos.push(new Tabela(defaultOptions))
        break

      case 'Lista':
        this.blocos.push(new Lista(defaultOptions))
        break

      case 'Audio':
        this.blocos.push(new Audio(defaultOptions))
        break

      case 'Video':
        this.blocos.push(new Video(defaultOptions))
        break

      case 'GravadorAudio':
        this.blocos.push(new GravadorAudio(defaultOptions))
        break

    }


  }


  esconderBlocos() {
    for (let i = 0; i < this.blocos.length; i++) {
      while (this.blocos[i].folhaContainer.firstChild)
        this.blocos[i].folhaContainer.firstChild.remove()
    }
  }

  mostrarBlocos() {
    for (let i = 0; i < this.blocos.length; i++) {
      this.blocos[i].folhaContainer.appendChild(this.blocos[i].blocoRef)
    }
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
