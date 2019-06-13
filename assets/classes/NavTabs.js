const Estilo = require("./Estilo")
const Botao = require("./Botao")
class NavTabs extends Estilo {
  constructor(options) {
    super()
    this.criar(options)
  }
  criar(options) {
    this.ref = document.createElement("navtab")
    this.text = document.createElement("p")
    this.text.textContent = options.text
    this.moreTabs = options.moreTabs
    this.addEstilo(this.text, {
      color: "white",
      fontSize: "1.1em",
      fontWeight: "bold",
      opacity: 0,
      userSelect: "none"
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
      backgroundColor: "var(--cor-media)"
    })
    this.hover(this.ref, {
      cursor: "pointer",
      backgroundColor: "var(--cor-clara)"
    })
    this.ref.onclick = () => {
      this.setActive(options.tabs)
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
    anim.onfinish = () => this.addEstilo(this.text, { opacity: 1 })
  }
  setActive(tabs) {
    tabs.forEach(tab => {
      tab.removeActive()
    })

    this.action()
  }

  excluirNavTab(options) {
    if (confirm("Tem certeza que deseja excluir essa folha ?")) {
      if (this.moreTabs) {
        this.addEstilo(this.text, {
          opacity: 0
        })
        let anim = this.ref.animate(
          [{ width: "150px", opacity: 1 }, { width: "0px", opacity: 0 }],
          100
        )
        anim.onfinish = () => {
          options.ref.removeChild(this.ref)
          options.tabs.splice(options.index, 1)
          options.navbar.atualizarNumAbas()
        }
      } else {
        let tab = options.tabs.find(tab => tab.moreTabs == true)

        if (tab) {
          this.addEstilo(this.text, { opacity: 0 })

          let anim = this.ref.animate(
            [{ width: "150px", opacity: 1 }, { width: "0px", opacity: 0 }],
            100
          )

          anim.onfinish = () => {
            options.moreTabsRef.removeChild(tab.ref)
            options.ref.appendChild(tab.ref)
            tab.moreTabs = false
            options.ref.removeChild(this.ref)
            options.tabs.splice(options.index, 1)
            options.navbar.atualizarNumAbas()
            options.navbar.fecharMoreButton()
          }
        } else {
          this.addEstilo(this.text, {
            opacity: 0
          })
          let anim = this.ref.animate(
            [{ width: "150px", opacity: 1 }, { width: "0px", opacity: 0 }],
            100
          )
          anim.onfinish = () => {
            options.ref.removeChild(this.ref)
            options.tabs.splice(options.index, 1)
            options.navbar.atualizarNumAbas()
            options.navbar.fecharMoreButton()
          }
        }
      }
    }
  }

  removeActive() {
    this.canhover = true
    this.addEstilo(this.ref, {
      backgroundColor: "var(--cor-media)"
    })
  }
  action() {
    this.canhover = false
    this.addEstilo(this.ref, {
      backgroundColor: "var(--cor-clara)"
    })
  }
}

module.exports = NavTabs
