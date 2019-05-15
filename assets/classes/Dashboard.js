class Dashboard {
  constructor(bodyRef) {
    this.bodyRef = bodyRef
  }

  criar() {
    this.ref = document.createElement("dashboard")
  }

  callBook() {
    let caderno = require("./Caderno")
    caderno = new caderno(this.ref)
    caderno.criar()
    this.bodyRef.appendChild(this.ref)
  }

  callBag() {
    let mochila = require("./Mochila")
    mochila = new mochila(this.ref)
    mochila.criar()
    this.bodyRef.appendChild(this.ref)
  }
}

module.exports = Dashboard
