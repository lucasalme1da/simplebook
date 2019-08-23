const Blocos = require("./Blocos")
const Botao = require("./Botao")

class Lista extends Blocos {
  //adicionar U+00A7 \u00A7 &#167;

  constructor(options) {
    super(options)
    this.itens = []
    this.placeholder = "Me edite ;)"
    this.loadedFonts = options.loadedFonts
    this.styles = [
      {
        name: "Círculo",
        value: "circle"
      },
      {
        name: "Círculo Fechado",
        value: "disc"
      },
      {
        name: "Quadrado",
        value: "square"
      },
      {
        name: "Numeral",
        value: "decimal"
      },
      {
        name: "Numeral Com Zero",
        value: "decimal-leading-zero"
      },
      {
        name: "Letra Maiúscula",
        value: "upper-latin"
      },
      {
        name: "Letra Minúsculo",
        value: "lower-latin"
      },
      {
        name: "Romano Maiúsculo",
        value: "upper-roman"
      },
      {
        name: "Romano Minúsculo",
        value: "lower-roman"
      },
      {
        name: "Grego",
        value: "lower-greek"
      },
      {
        name: "Kanji",
        value: "simp-chinese-informal"
      }
    ]
    this.criarLista()
    if (options.load)
      this.load(options.load)
  }
  export() {
    this.exportData = {
      type: this.constructor.name,
      html: this.lista.innerHTML,
      font: this.fontFamily.value,
      size: this.fontSize.value,
      estilo: this.listStyle.value
    }
    return super.export()
  }
  load(data) {
    this.fontFamily.value = data.font
    this.fontSize.value = data.size
    this.lista.innerHTML = data.html
    if (data.estilo != 'Tipo de lista') {
      this.listStyle.value = data.estilo
      this.listStyle.onchange()
    }
    this.fontSize.onchange()
    this.fontFamily.onchange()

  }
  removeItem(ref) {
    let removedLista = ref.lista.lastChild
    if (removedLista) {
      let anim = removedLista.animate(
        [
          {
            opacity: "1",
            left: "0px"
          },
          {
            opacity: "0",
            left: "20px"
          }
        ],
        ref.animationTimes.medium
      )

      anim.onfinish = () => {
        ref.lista.removeChild(removedLista)
      }
    }
  }
  addItem(ref) {
    let li = document.createElement("li")

    li.textContent = this.placeholder
    li.setAttribute("contenteditable", "true")
    ref.addEstilo(li, {
      marginBottom: "10px",
      position: "relative",
      left: "0px",
      top: "0px"
    })
    ref.lista.appendChild(li)
    li.animate(
      [
        {
          opacity: "0",
          top: "-10px"
        },
        {
          opacity: "1",
          top: "0px"
        }
      ],
      ref.animationTimes.medium
    )
    ref.itens.push(li)
  }
  criarLista() {
    this.container = document.createElement("div")
    this.addEstilo(this.container, {
      width: "95%",
      height: "95%",
      overflow: "hidden"
    })
    this.lista = document.createElement("ul")
    this.lista.ondrag = e => {
      e.preventDefault()
    }
    this.lista.setAttribute("draggable", "false")
    this.addEstilo(this.lista, {
      width: "100%",
      marginBottom: "15px",
      listStylePosition: "inside"
    })
    this.plusContainer = document.createElement("pluscontainer")

    this.disableHoldSelectionAndDrag(this.plusContainer)

    this.addEstilo(this.plusContainer, {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end"
    })
    this.plus = new Botao({
      icon: "plus",
      width: "2vw",
      height: "2vw",
      imageWidth: "12px",
      imageHeight: "12px",
      ref: this.plusContainer,
      animation: true,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "50%",
        position: "relative",
        flexShrink: "0",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        marginRight: "10px"
      },
      action: () => this.addItem(this)
    })
    this.close = new Botao({
      icon: "close",
      width: "2vw",
      height: "2vw",
      imageWidth: "12px",
      imageHeight: "12px",
      ref: this.plusContainer,
      animation: true,
      style: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexShrink: "0",
        borderRadius: "50%",
        position: "relative",
        backgroundColor: "var(--cor-media)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
      },
      action: () => this.removeItem(this)
    })

    this.listStyle = document.createElement("select")
    let firstOption = document.createElement("option")
    firstOption.setAttribute("selected", "true")
    firstOption.setAttribute("disabled", "true")
    firstOption.textContent = "Tipo de lista"
    this.listStyle.appendChild(firstOption)
    this.addEstilo(firstOption, {
      backgroundColor: "var(--cor-clara)"
    })
    this.addEstilo(this.listStyle, {
      width: "90%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      borderBottom: "1px solid white",
      marginBottom: "10px"
    })

    this.listStyle.onchange = () => {
      this.addEstilo(this.lista, {
        listStyleType: this.listStyle.value
      })
    }
    this.styles.forEach(style => {
      let option = document.createElement("option")
      option.textContent = style.name
      option.setAttribute("value", style.value)
      this.addEstilo(option, {
        backgroundColor: "var(--cor-clara)"
      })
      this.listStyle.appendChild(option)
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
      this.addEstilo(this.lista, {
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

    this.addEstilo(this.lista, {
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
      this.addEstilo(this.lista, {
        fontSize: this.reparsePx(this.fontSize.value)
      })
    }

    this.addEstilo(this.lista, {
      fontFamily: this.fontFamily.value,
      fontSize: this.reparsePx(this.fontSize.value)
    })
    this.configFont.append(this.fontFamily, this.fontSize)

    this.addItem(this)
    this.container.append(this.plusContainer, this.lista)
    this.addConfig([this.listStyle, this.configFont])
    this.addMainContent(this.container)
  }
}

module.exports = Lista
