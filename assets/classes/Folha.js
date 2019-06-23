const Estilo = require("./Estilo")
const Blocos = require("./Blocos")
const Texto = require("./Texto")

class Folha extends Estilo {
  constructor(options) {
    super()
    this.blocos = options.blocos || []
    this.folhaContainer = options.folhaContainer
    this.zIndexBlocoMin = 5
    this.zIndexBlocoMax = 300
    // this.criarTexto({
    //   posX: 100,
    //   posY: 100,
    //   loadedFonts: options.loadedFonts
    // })
    this.loadedFonts = options.loadedFonts
  }

  criarTexto(options) {
    this.blocos.push(
      new Texto({
        folhaContainer: this.folhaContainer,
        posX: `${options.posX - this.folhaContainer.offsetWidth}px`,
        posY: `${options.posY - this.folhaContainer.offsetHeight}px`,
        loadedFonts: this.loadedFonts,
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
