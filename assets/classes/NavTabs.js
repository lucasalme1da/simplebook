const Estilo = require("./Estilo")
const Botao = require("./Botao")
const Folha = require("./Folha")
let folhaCounter = 1
class NavTabs extends Estilo {
  constructor(options) {
    super()
    this.criar(options)
    this.belongsTo = options.belongsTo
    this.pageRef = options.pageRef
    this.navbar = options.navbar
    this.tabs = options.tabs
    this.index = options.index
    this.optref = options.ref
  }

  criar(options) {
    this.ref = document.createElement("navtab")

    this.text = document.createElement("p")

    // Manipulação do Título da Aba
    this.text.textContent = options.name
      ? options.name
      : `Nova Folha (${folhaCounter++})`

    this.addRenamable(this.text, 12, null, 45)

    this.moreTabs = options.moreTabs

    this.folhaContainer = options.folhaContainer

    this.addEstilo(this.text, {
      color: "white",
      fontSize: "1.1em",
      fontWeight: "bold",
      opacity: 0,
      userSelect: "none",
      whiteSpace: "pre-wrap",
      whiteSpace: "nowrap",
      overflow: "hidden",
      width: "80%"
    })

    this.addEstilo(this.ref, {
      width: "150px",
      height: "35%",
      display: "flex",
      borderTopRightRadius: "8px",
      borderTopLeftRadius: "8px",
      alignItems: "center",
      flexShrink: 3,
      justifyContent: "space-between",
      padding: "10px",
      backgroundColor: "var(--cor-escura)",
      overflow: "hidden",
      whiteSpace: "nowrap",
      flexDirection: "row",
      transition: "all 0.3s ease"
    })

    this.hover(this.ref, {
      cursor: "pointer",
      backgroundColor: "var(--cor-clara)"
    })

    this.ref.onclick = e => {
      if (e.target == this.ref || e.target == this.text) this.setActive()
    }

    this.ref.appendChild(this.text)
    this.close = new Botao({
      icon: "close",
      width: "30px",
      height: "30px",
      imageWidth: "12px",
      imageHeight: "12px",
      ref: this.ref,
      action: () => this.excluirNavTab(options),
      style: {
        borderRadius: "50%"
      }
    })

    if (options.moreTabs) {
      this.addEstilo(this.ref, {
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        marginBottom: "5px",
        height: "30px",
        flexShrink: 0
      })

      this.hover(this.ref, {
        cursor: "pointer",
        backgroundColor: "var(--cor-clara)"
      })
    }

    options.ref.appendChild(this.ref)
    let anim = this.ref.animate(
      [{ width: "0px", opacity: 1 }, { width: "150px", opacity: 0 }],
      100
    )
    anim.onfinish = () => {
      this.addEstilo(this.text, { opacity: 1 })
      this.setActive()
    }
  }

  setActive() {
    this.tabs.forEach(tab => {
      tab.removeActive()
    })

    this.action()
  }

  excluirNavTab(options) {
    if (confirm("Tem certeza que deseja excluir essa folha ?")) {
      if (this.moreTabs) {
        console.log("passou aqui men")

        this.addEstilo(this.text, { opacity: 0 })

        let anim = this.ref.animate(
          [{ width: "150px", opacity: 1 }, { width: "0px", opacity: 0 }],
          100
        )

        anim.onfinish = () => {
          // EDITADO POR LUCAS
          let lastTabRemoved = 0
          if (
            this.navbar.currentTab ==
            this.navbar.allCurrentTabs()[
              this.navbar.allCurrentTabs().length - 1
            ]
          ) {
            lastTabRemoved = 1
          }

          let nextTab = null
          if (this == this.navbar.currentTab) {
            if (
              this.navbar.allCurrentTabs()[
                this.navbar.allCurrentTabs().indexOf(this) + 1
              ] != undefined
            ) {
              nextTab = this.navbar.allCurrentTabs()[
                this.navbar.allCurrentTabs().indexOf(this) + 1
              ]
            }
          }

          // /EDITADO POR LUCAS

          options.navbar.tabs.splice(options.navbar.tabs.indexOf(this), 1)
          options.ref.removeChild(this.ref)
          options.navbar.atualizarNumAbas()
          options.navbar.fecharMoreButton()
          this.navbar.updateTabs()

          // EDITADO POR LUCAS

          if (lastTabRemoved) {
            this.selectLastTab()
          }

          if (nextTab) {
            this.selectTab(nextTab)
          }

          if (this.navbar.allCurrentTabs().length == 0)
            this.pageRef.esconderBlocos()

          if (this.tabs.length == 0) {
            this.navbar.dashBag
              .getBag()
              .currentBag()
              .esconderCadernos()
          }

          // /EDITADO POR LUCAS

          // if (this.tabs.length == 0) {
          //   let book = this.navbar.dashBag.currentBook()
          //   book.esconderFolhas()
          // }
        }
      } else {
        let tab = this.navbar.allCurrentTabs().find(tab => tab.moreTabs == true)

        if (tab) {
          this.addEstilo(this.text, { opacity: 0 })

          let anim = this.ref.animate(
            [{ width: "150px", opacity: 1 }, { width: "0px", opacity: 0 }],
            100
          )

          anim.onfinish = () => {
            // EDITADO POR LUCAS
            let lastTabRemoved = 0
            if (
              this.navbar.currentTab ==
              this.navbar.allCurrentTabs()[
                this.navbar.allCurrentTabs().length - 1
              ]
            ) {
              lastTabRemoved = 1
            }

            let nextTab = null
            if (this == this.navbar.currentTab) {
              if (
                this.navbar.allCurrentTabs()[
                  this.navbar.allCurrentTabs().indexOf(this) + 1
                ] != undefined
              ) {
                nextTab = this.navbar.allCurrentTabs()[
                  this.navbar.allCurrentTabs().indexOf(this) + 1
                ]
              }
            }

            // /EDITADO POR LUCAS

            options.moreTabsRef.removeChild(tab.ref)
            options.ref.appendChild(tab.ref)
            tab.moreTabs = false
            options.navbar.tabs.splice(options.navbar.tabs.indexOf(this), 1)
            options.ref.removeChild(this.ref)
            options.navbar.atualizarNumAbas()
            options.navbar.fecharMoreButton()
            this.navbar.updateTabs()

            // EDITADO POR LUCAS

            if (lastTabRemoved) {
              this.selectLastTab()
            }

            if (nextTab) {
              this.selectTab(nextTab)
            }

            if (this.navbar.allCurrentTabs().length == 0)
              this.pageRef.esconderBlocos()

            if (this.tabs.length == 0) {
              this.navbar.dashBag
                .getBag()
                .currentBag()
                .esconderCadernos()
            }

            // /EDITADO POR LUCAS

            // if (this.tabs.length == 0) {
            //   let book = this.navbar.dashBag.currentBook()
            //   book.esconderFolhas()
            // }
          }
        } else {
          this.addEstilo(this.text, { opacity: 0 })

          let anim = this.ref.animate(
            [{ width: "150px", opacity: 1 }, { width: "0px", opacity: 0 }],
            100
          )

          anim.onfinish = () => {
            let lastTabRemoved = 0
            if (
              this.navbar.currentTab ==
              this.navbar.allCurrentTabs()[
                this.navbar.allCurrentTabs().length - 1
              ]
            ) {
              lastTabRemoved = 1
            }

            let nextTab = null
            if (this == this.navbar.currentTab) {
              if (
                this.navbar.allCurrentTabs()[
                  this.navbar.allCurrentTabs().indexOf(this) + 1
                ] != undefined
              ) {
                nextTab = this.navbar.allCurrentTabs()[
                  this.navbar.allCurrentTabs().indexOf(this) + 1
                ]
              }
            }

            options.navbar.tabs.splice(options.navbar.tabs.indexOf(this), 1)
            options.ref.removeChild(this.ref)
            options.navbar.atualizarNumAbas()
            options.navbar.fecharMoreButton()
            this.navbar.updateTabs()

            if (lastTabRemoved) {
              this.selectLastTab()
            }

            if (nextTab) {
              this.selectTab(nextTab)
            }

            if (this.navbar.allCurrentTabs().length == 0)
              this.pageRef.esconderBlocos()

            if (this.tabs.length == 0) {
              this.navbar.dashBag
                .getBag()
                .currentBag()
                .esconderCadernos()
            }
          }
        }
      }
    }
  }

  deleteMe() {
    this.optref.removeChild(this.ref)
    this.pageRef.esconderBlocos()
  }

  selectTab(thistab) {
    thistab.setActive()
  }

  selectLastTab() {
    if (this.navbar.allCurrentTabs().length > 0) {
      this.navbar
        .allCurrentTabs()
        [this.navbar.allCurrentTabs().length - 1].setActive()
    }
  }

  removeActive() {
    this.canhover = true
    this.addEstilo(this.ref, {
      backgroundColor: "var(--cor-escura)"
    })
  }

  action() {
    if (this.navbar.allCurrentTabs().length > 0) {
      this.book = this.belongsTo.thisBag.currentBook()
      this.book.esconderFolhas()
      this.page = this.pageRef
      this.book.selectedPage = this.page
      this.page.setPageHeight()
      this.page.mostrarBlocos()
      this.canhover = false
      this.addEstilo(this.ref, {
        backgroundColor: "var(--cor-clara)"
      })
      this.navbar.currentTab = this
      this.navbar.currentTab.belongsTo.lastTabSelected = this
    }
    // console.log("Aba atual ->", this.navbar.currentTab) // Renomear Atributos
    // console.log("Página atual ->", this.navbar.currentTab.pageRef)
    // console.log("Caderno atual ->", this.navbar.currentTab.belongsTo)
    // console.log("Mochila atual ->", this.navbar.currentTab.belongsTo.thisBag)
  }
}

module.exports = NavTabs
