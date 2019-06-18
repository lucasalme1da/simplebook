let caderno = require("./Caderno")
let mochila = require("./Mochila")
let blocoDash = require("./BlocoDash")
const Estilo = require("./Estilo")

class Dashboard extends Estilo {
  constructor(options) {
    super()
    this.bodyRef = options.bodyRef
    this.navBar = options.navBar
    this.criar()
    switch (options.dashType) {
      case "caderno":
        this.callBook()
        break
      case "mochila":
        this.callBag()
        break
      case "blocos":
        this.callBlocks()
        break
    }
  }

  criar() {
    this.ref = document.createElement("dashboard")
    this.addEstilo(this.ref, {
      display: "none",
      position: "absolute",
      zIndex: "1",
      top: "5vh",
      height: "95vh",
      width: "20vw",
      background: "var(--cor-escura)",
      alignSelf: "flex-end"
    })
  }

  openDash() {
    console.log(this.ref.style.display, this.ref)

    if (this.ref.style.display == "none") {
      this.addEstilo(this.ref, {
        display: "block"
      })
    } else {
      this.addEstilo(this.ref, {
        display: "none"
      })
    }

    console.log(this.ref.style.display)
  }

  isOpened() {
    return this.ref.style.display == "block"
  }

  callBook() {
    caderno = new caderno(this)
    caderno.criar()
    this.bodyRef.appendChild(this.ref)
  }

  callBag() {
    mochila = new mochila(this)
    mochila.criar()
    this.bodyRef.appendChild(this.ref)
  }

  callBlocks() {
    blocoDash = new blocoDash(this)
    blocoDash.criar()
    this.bodyRef.appendChild(this.ref)
  }
}

module.exports = Dashboard
