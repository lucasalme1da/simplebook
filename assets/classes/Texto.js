const Blocos = require("./Blocos")
const Botao = require("./Botao")
class Texto extends Blocos {
  constructor(options) {
    super(options)
    this.loadedFonts = options.loadedFonts
    this.bolded = false
    this.italiced = false
    this.underlined = false
    this.criarTexto()
    if (options.load)
      this.load(options.load)
  }
  export() {

    this.exportData = {
      type: this.constructor.name,
      text: this.texto.value,
      font: this.fontFamily.value,
      size: parseInt(this.fontSize.value),
      bold: this.bolded,
      italiced: this.italiced,
      underlined: this.underlined,
      align: this.texto.style.textAlign || 'left'
    }
    return super.export()

  }
  load(data) {

    const { text, font, size, align, bold, italiced, underlined } = data

    this.texto.value = text
    if (bold) this.setBold(this)
    if (italiced) this.setItalic(this)
    if (underlined) this.setUnderline(this)
    this.fontFamily.value = font
    this.fontSize.value = size
    this.fontSize.onchange()
    this.fontFamily.onchange()
    let bt
    switch (align) {
      case 'left':
        bt = this.btAlignLeft
        break
      case 'right':
        bt = this.btAlignRight
        break
      case 'center':
        bt = this.btAlignCenter
        break
    }
    this.setAlign(this, align, bt)


  }
  checkSelection() {
    if (window.getSelection) {
      let selection = window.getSelection()

      if (selection.type == "Range") {
        return selection
      } else {
        return false
      }
    } else {
      return false
    }
  }

  //Futuras implementações, colocar em bold só o texto selecionado
  getSelectedText(selection, text) {
    let selectionStart = selection.extentOffset
    let selectionEnd = selection.baseOffset
    let sub = text.substring(selectionStart, selectionEnd)
    let textoAntes = text.substring(0, selectionStart)
    let textoDepois = text.substring(selectionEnd + 1, text.length)
    sub = `<strong>${sub}</strong>`
    return textoAntes + sub + textoDepois
  }

  setBold(ref) {
    if (ref.bolded) {
      ref.bolded = false
      ref.addEstilo(ref.texto, {
        fontWeight: "normal"
      })
      ref.addEstilo(ref.bold.ref, {
        backgroundColor: "var(--cor-media)"
      })
    } else {
      ref.bolded = true
      ref.addEstilo(ref.texto, {
        fontWeight: "bold"
      })
      ref.addEstilo(ref.bold.ref, {
        backgroundColor: "var(--cor-escura)"
      })
    }
  }

  setItalic(ref) {
    if (ref.italiced) {
      ref.italiced = false
      ref.addEstilo(ref.texto, {
        fontStyle: "normal"
      })
      ref.addEstilo(ref.italic.ref, {
        backgroundColor: "var(--cor-media)"
      })
    } else {
      ref.italiced = true
      ref.addEstilo(ref.texto, {
        fontStyle: "italic"
      })
      ref.addEstilo(ref.italic.ref, {
        backgroundColor: "var(--cor-escura)"
      })
    }
  }

  setUnderline(ref) {
    if (ref.underlined) {
      ref.underlined = false
      ref.addEstilo(ref.texto, {
        textDecoration: "none"
      })
      ref.addEstilo(ref.underline.ref, {
        backgroundColor: "var(--cor-media)"
      })
    } else {
      ref.underlined = true
      ref.addEstilo(ref.texto, {
        textDecoration: "underline"
      })
      ref.addEstilo(ref.underline.ref, {
        backgroundColor: "var(--cor-escura)"
      })
    }
  }

  setAlign(ref, align, button) {
    this.justify.forEach(bt => {
      ref.addEstilo(bt.ref, {
        backgroundColor: "var(--cor-media)"
      })
    })

    ref.addEstilo(button.ref, {
      backgroundColor: "var(--cor-escura)"
    })
    switch (align) {
      case "right":
        ref.addEstilo(ref.texto, {
          textAlign: "right"
        })

        break

      case "center":
        ref.addEstilo(ref.texto, {
          textAlign: "center"
        })

        break

      case "left":
        ref.addEstilo(ref.texto, {
          textAlign: "left"
        })

        break
    }
  }

  criarTexto() {
    this.texto = document.createElement("textarea")
    this.focusElement = this.texto
    this.addEstilo(this.texto, {
      // paddingTop: '0.5em',
      // paddingLeft: '5px',
      border: "none",
      width: "95%",
      height: "95%",
      overflow: "hidden",
      resize: "none",
      userSelect: 'none'
    })

    this.configFont = document.createElement("configFont")
    this.addEstilo(this.configFont, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginBottom: "10px"
    })
    this.fontFamily = document.createElement("select")
    this.addEstilo(this.fontFamily, {
      width: "60%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      borderBottom: "1px solid white"
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
      this.addEstilo(option, {
        backgroundColor: "var(--cor-clara)"
      })
      this.fontFamily.appendChild(option)
    })

    this.addEstilo(this.texto, {
      fontFamily: this.fontFamily.value
    })

    this.fontSize = document.createElement("input")
    this.addEstilo(this.fontSize, {
      width: "20%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      borderBottom: "1px solid white"
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

    this.configText = document.createElement("configText")

    this.addEstilo(this.configText, {
      display: "flex",
      flexDirection: "row",
      marginBottom: "5px"
    })

    let fontPx = "16px"
    let fontPxAlign = "12px"
    let btTam = "30px"
    this.bold = new Botao({
      icon: "bold",
      width: btTam,
      height: "30px",
      imageWidth: fontPx,
      imageHeight: fontPx,
      animation: true,
      ref: this.configText,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.setBold(this)
    })

    this.italic = new Botao({
      icon: "italic",
      width: btTam,
      height: btTam,
      imageWidth: fontPx,
      imageHeight: fontPx,
      animation: true,
      ref: this.configText,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.setItalic(this)
    })

    this.underline = new Botao({
      icon: "underline",
      width: btTam,
      height: btTam,
      imageWidth: fontPx,
      imageHeight: fontPx,
      animation: true,
      ref: this.configText,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.setUnderline(this)
    })

    this.alignContainer = document.createElement("alignContainer")

    this.addEstilo(this.alignContainer, {
      display: "flex",
      flexDirection: "row"
    })

    this.btAlignLeft = new Botao({
      icon: "alignLeft",
      width: btTam,
      height: btTam,
      imageWidth: fontPxAlign,
      imageHeight: fontPxAlign,
      animation: true,
      ref: this.alignContainer,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.setAlign(this, "left", this.btAlignLeft)
    })

    this.btAlignCenter = new Botao({
      icon: "alignCenter",
      width: btTam,
      height: btTam,
      imageWidth: fontPxAlign,
      imageHeight: fontPxAlign,
      animation: true,
      ref: this.alignContainer,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.setAlign(this, "center", this.btAlignCenter)
    })

    this.btAlignRight = new Botao({
      icon: "alignRight",
      width: btTam,
      height: btTam,
      imageWidth: fontPxAlign,
      imageHeight: fontPxAlign,
      animation: true,
      ref: this.alignContainer,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.setAlign(this, "right", this.btAlignRight)
    })

    this.justify = [this.btAlignLeft, this.btAlignCenter, this.btAlignRight]

    this.opContainer = document.createElement("opContainer")
    this.addEstilo(this.opContainer, {
      display: "flex",
      marginBottom: "10px",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%"
    })
    this.opContainer.append(this.configText, this.alignContainer)

    this.addMainContent(this.texto)
    this.addConfig([this.opContainer, this.configFont])
  }
}

module.exports = Texto
