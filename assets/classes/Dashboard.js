let cadernoDash = require("./CadernoDash")
let mochilaDash = require("./MochilaDash")
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
      zIndex: '302',
      background: "var(--cor-escura)",
      alignSelf: "flex-end"
    })
  }

  openDash() {
    if (this.ref.style.display == "none") {

      this.addEstilo(this.ref, {
        display: "block"
      })
      this.ref.animate([{
        opacity: '0',
        right: '-10vw'
      }, {
        opacity: '1',
        right: '0vw'
      }], this.animationTimes.medium)
    } else {
      let anim = this.ref.animate([{
        opacity: '1',
        right: '0vw'
      }, {
        opacity: '1',
        right: '-10vw'
      }], this.animationTimes.medium)
      anim.onfinish = () => {
        this.addEstilo(this.ref, {
          display: "none"
        })


      }
    }
  }

  isOpened() {
    return this.ref.style.display == "block"
  }

  callBook() {
    cadernoDash = new cadernoDash(this)
    cadernoDash.criar()
    this.bodyRef.appendChild(this.ref)
  }

  callBag() {
    this.mochilaDash = new mochilaDash(this)
    this.mochilaDash.criar()
    this.bodyRef.appendChild(this.ref)
  }

  callBlocks() {
    blocoDash = new blocoDash(this)
    blocoDash.criar()
    this.bodyRef.appendChild(this.ref)
  }

  getBook() {
    return cadernoDash
  }

  getBag() {
    return mochilaDash
  }
}

module.exports = Dashboard
