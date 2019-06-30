const Estilo = require("./Estilo")
const Blocos = require("./Blocos")
const Texto = require("./Texto")
const Imagem = require("./Imagem")
const Lista = require("./Lista")
const Tabela = require("./Tabela")

class Folha extends Estilo {
  constructor(options) {
    super()
    this.blocos = options.blocos || []
    this.folhaContainer = options.folhaContainer
    this.zIndexBlocoMin = 5
    this.zIndexBlocoMax = 300
    this.loadedFonts = options.loadedFonts
    this.criarImagem({
      posX: 100,
      posY: 100
    })
    this.criarLista({
      posX: 100,
      posY: 100
    })
    this.criarTabela({
      posX: 200,
      posY: 200,
      initialHeight: 400,
      initialWidth: 500
    })
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
