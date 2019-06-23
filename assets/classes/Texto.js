const Blocos = require("./Blocos")
class Texto extends Blocos {
  constructor(options) {
    super(options)
    this.loadedFonts = options.loadedFonts
    this.criarTexto()
  }

  criarTexto() {
    this.texto = document.createElement("textarea")
    this.addEstilo(this.texto, {
      border: "none",
      width: "95%",
      height: "95%",
      overflow: "hidden",
      resize: "none"
    })

    this.configFont = document.createElement("configFont")
    this.addEstilo(this.configFont, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginBottom: "5px"
    })
    this.fontFamily = document.createElement("select")
    this.addEstilo(this.fontFamily, {
      width: "60%"
    })
    this.fontFamily.onchange = () => {
      this.addEstilo(this.texto, {
        fontFamily: this.fontFamily.value
      })
    }
    //this.waitFontsDefinitions(this, this.fontFamily)
    this.loadedFonts.fonts.forEach(font => {
      let option = document.createElement("option")
      option.textContent = font
      option.setAttribute("value", font)
      this.fontFamily.appendChild(option)
    })

    this.addEstilo(this.texto, {
      fontFamily: this.fontFamily.value
    })

    this.fontSize = document.createElement("input")
    this.addEstilo(this.fontSize, {
      width: "20%"
    })
    this.fontSize.setAttribute("type", "number")
    this.fontSize.setAttribute("min", "0")
    this.fontSize.setAttribute("value", "24")

    this.fontSize.onchange = () => {
      this.addEstilo(this.texto, {
        fontSize: this.reparsePx(this.fontSize.value)
      })
    }

    this.addEstilo(this.texto, {
      fontFamily: this.fontFamily.value,
      fontSize: this.reparsePx(this.fontSize.value)
    })
    this.configFont.append(this.fontFamily, this.fontSize)

    this.addMainContent(this.texto)
    this.addConfig([this.configFont])
  }

  // waitFontsDefinitions(ref, select) {

  //     return new Promise(resolve => {
  //         const load = () => {
  //             ref.loadedFonts.fonts.forEach(font => {
  //                 let option = document.createElement('option')
  //                 option.textContent = font
  //                 option.setAttribute('value', font)
  //                 select.appendChild(option)
  //             })

  //         }
  //         const check = () => {
  //             if (ref.loadedFonts.fonts.length == 0) {
  //                 //console.log(ref.loadedFonts)
  //                 setTimeout(check, 50)
  //             } else {
  //                 load()
  //             }
  //         }
  //         check()

  //     })

  // }
}

module.exports = Texto
