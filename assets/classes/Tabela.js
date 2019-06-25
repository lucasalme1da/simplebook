const Blocos = require("./Blocos")
const Botao = require("./Botao")

class Tabela extends Blocos {
  constructor(options) {
    super(options)
    this.numColunas = 2
    this.displayText = "Me edite ;)"
    this.loadedFonts = options.loadedFonts
    this.selectOptions = [
      {
        name: "Padrão",
        defaultName: "Estilo da tabela",
        value: ""
      },
      {
        name: "Verde Simples",
        value: "simpleGreen"
      },
      {
        name: "Cinza Simples",
        value: "linhaSimples"
      },
      {
        name: "Verde Sombreado",
        value: "fl-table"
      },
      {
        name: "Violeta",
        value: "table-black"
      },
      {
        name: "Branco",
        value: "branco"
      },
      {
        name: "Preto",
        value: "preto"
      }
    ]
    this.selectAlign = [
      {
        name: "Esqueda",
        value: "left",
        defaultName: "Alinhamento"
      },
      {
        name: "Centro",
        value: "center"
      },
      {
        name: "Direita",
        value: "right"
      }
    ]
    this.criarTabela()
  }

  addColuna(ref) {
    let trs = ref.tabela.children[0].children
    if (trs.length > 0) {
      let first = true
      Array.from(trs).forEach(tr => {
        let td
        if (first) {
          td = document.createElement("th")
          td.textContent = "Um título legal"
          first = false
        } else {
          td = document.createElement("td")
          td.textContent = ref.displayText
        }
        td.setAttribute("contenteditable", "true")
        ref.addEstilo(td, {
          position: "relative",
          left: "0px",
          opacity: "1",
          textAlign: ref.align.value
        })
        tr.appendChild(td)
        tr.animate(
          [
            {
              opacity: "0",
              transform: "scale(0.8)"
            },
            {
              opacity: "1",
              transform: "scale(1)"
            }
          ],
          ref.animationTimes.medium
        )
      })
    } else {
      let tr = document.createElement("tr")
      let td
      td = document.createElement("th")
      td.textContent = "Um título legal"
      td.setAttribute("contenteditable", "true")
      ref.addEstilo(td, {
        position: "relative",
        left: "0px",
        opacity: "1",
        textAlign: ref.align.value
      })
      tr.appendChild(td)
      ref.tabela.children[0].appendChild(tr)
      tr.animate(
        [
          {
            opacity: "0",
            transform: "scale(0.8)"
          },
          {
            opacity: "1",
            transform: "scale(1)"
          }
        ],
        ref.animationTimes.medium
      )
    }

    ref.numColunas++
    console.log(ref.numColunas)
  }

  removeColuna(ref) {
    let trs = ref.tabela.children[0].children
    if (ref.numColunas > 0) {
      Array.from(trs).forEach(tr => {
        let anim = tr.lastElementChild.animate(
          [
            {
              opacity: "1",
              left: "0px"
            },
            {
              opacity: "0",
              left: "-2vw"
            }
          ],
          ref.animationTimes.medium
        )

        anim.onfinish = () => {
          tr.removeChild(tr.lastElementChild)
        }
      })

      ref.numColunas--
      console.log(ref.numColunas)
    }
  }

  removeLine(ref) {
    let tr = ref.tabela.children[0].lastElementChild
    if (tr) {
      let anim = tr.animate(
        [
          {
            opacity: "1",
            top: "0px"
          },
          {
            opacity: "0",
            top: "-2vw"
          }
        ],
        ref.animationTimes.medium
      )

      anim.onfinish = () => {
        ref.tabela.children[0].removeChild(tr)
      }
    }
  }

  addTextEdit(ref, refel) {
    ref.configFont = document.createElement("configFont")
    ref.addEstilo(ref.configFont, {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      marginBottom: "10px"
    })
    ref.fontFamily = document.createElement("select")
    ref.addEstilo(ref.fontFamily, {
      width: "60%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      borderBottom: "1px solid white"
    })
    ref.fontFamily.onchange = () => {
      ref.addEstilo(refel, {
        fontFamily: this.fontFamily.value
      })
    }
    //this.waitFontsDefinitions(this, this.fontFamily)
    ref.loadedFonts.fonts.forEach(font => {
      let option = document.createElement("option")
      option.textContent = font
      option.setAttribute("value", font)
      this.addEstilo(option, {
        backgroundColor: "var(--cor-clara)"
      })
      this.fontFamily.appendChild(option)
    })

    ref.addEstilo(refel, {
      fontFamily: ref.fontFamily.value
    })

    ref.fontSize = document.createElement("input")
    ref.addEstilo(ref.fontSize, {
      width: "20%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      borderBottom: "1px solid white"
    })
    ref.fontSize.setAttribute("type", "number")
    ref.fontSize.setAttribute("min", "0")
    ref.fontSize.setAttribute("value", "24")

    ref.fontSize.onchange = () => {
      ref.addEstilo(refel, {
        fontSize: ref.reparsePx(ref.fontSize.value)
      })
    }

    ref.addEstilo(refel, {
      fontFamily: ref.fontFamily.value,
      fontSize: ref.reparsePx(ref.fontSize.value)
    })
    ref.configFont.append(ref.fontFamily, ref.fontSize)
  }

  addSelectEdit(ref, options, action) {
    //primeiroItem default
    let select = document.createElement("select")
    let firstOption = document.createElement("option")
    firstOption.setAttribute("selected", "true")
    firstOption.setAttribute("disabled", "true")
    firstOption.textContent = options[0].defaultName
    select.appendChild(firstOption)
    this.addEstilo(firstOption, {
      backgroundColor: "var(--cor-clara)"
    })
    this.addEstilo(select, {
      width: "90%",
      backgroundColor: "transparent",
      border: "none",
      color: "white",
      borderBottom: "1px solid white",
      marginBottom: "10px"
    })

    select.onchange = () => {
      action(select.value)
    }
    options.forEach(op => {
      let option = document.createElement("option")
      option.textContent = op.name

      option.setAttribute("value", op.value)
      this.addEstilo(option, {
        backgroundColor: "var(--cor-clara)"
      })
      select.appendChild(option)
    })
    return select
  }

  addLine(ref) {
    let line = document.createElement("tr")
    for (let i = 0; i < ref.numColunas; i++) {
      let td = document.createElement("td")
      td.setAttribute("contenteditable", "true")
      td.textContent = ref.displayText
      ref.addEstilo(td, {
        position: "relative",
        top: "0px",
        opacity: "1",
        textAlign: ref.align.value
      })
      line.appendChild(td)
    }
    ref.tabela.children[0].appendChild(line)
    line.animate(
      [
        {
          opacity: "0",
          transform: "scale(0.8)"
        },
        {
          opacity: "1",
          transform: "scale(1)"
        }
      ],
      ref.animationTimes.medium
    )
  }

  criarTabela() {
    this.tabela = document.createElement("table")
    this.tabela.setAttribute('draggable', 'false')
    this.tabela.innerHTML = `<tr>
        <th contenteditable >Itens</th>
        <th contenteditable >Descrição</th>
      </tr>
      <tr>
        <td contenteditable >Item 1</td>
        <td contenteditable>Um item legal</td>
      </tr>
      <tr>
        <td contenteditable>Item 2</td>
        <td contenteditable>Um item legal</td>
      </tr>`
    this.container = document.createElement("div")
    this.addEstilo(this.container, {
      width: "95%",
      height: "95%",
      overflow: "hidden"
    })
    this.tabelaContainer = document.createElement("div")
    this.addEstilo(this.tabela, {
      width: "100%"
    })
    this.addEstilo(this.tabelaContainer, {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: "20px"
    })

    let buttonWidth = '2vw'
    let btiImageWidth = '20px'
    let btImageHeight = '20px'

    this.addBtColuna = new Botao({
      icon: "addColumn",
      width: buttonWidth,
      height: buttonWidth,
      imageWidth: btiImageWidth,
      imageHeight: btImageHeight,
      ref: this.tabelaContainer,
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
      action: () => this.addColuna(this)
    })
    this.addBtLine = new Botao({
      icon: "addLine",
      width: buttonWidth,
      height: buttonWidth,
      imageWidth: btiImageWidth,
      imageHeight: btImageHeight,
      ref: this.tabelaContainer,
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
      action: () => this.addLine(this)
    })
    this.removeBtColuna = new Botao({
      icon: "removeColumn",
      width: buttonWidth,
      height: buttonWidth,
      imageWidth: btiImageWidth,
      imageHeight: btImageHeight,
      ref: this.tabelaContainer,
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
      action: () => this.removeColuna(this)
    })
    this.removeBtLine = new Botao({
      icon: "removeLine",
      width: buttonWidth,
      height: buttonWidth,
      imageWidth: btiImageWidth,
      imageHeight: btImageHeight,
      ref: this.tabelaContainer,
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
      action: () => this.removeLine(this)
    })

    this.addTextEdit(this, this.tabela)
    const editAction = selectValue => {
      this.tabela.className = ""
      if (selectValue) {
        this.tabela.classList.add(selectValue)
      }
    }
    const editAlign = selectValue => {
      return new Promise(resolve => {
        Array.from(this.tabela.children[0].children).forEach(tr => {
          Array.from(tr.children).forEach(td => {
            this.addEstilo(td, {
              textAlign: `${selectValue}`
            })
          })
        })
      })
    }

    this.selectType = this.addSelectEdit(this, this.selectOptions, editAction)
    this.align = this.addSelectEdit(this, this.selectAlign, editAlign)

    this.container.append(this.tabelaContainer, this.tabela)
    this.addMainContent(this.container)
    this.addConfig([this.align, this.selectType, this.configFont])
  }
}

module.exports = Tabela
