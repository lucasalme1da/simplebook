class Caderno {
  constructor(bodyRef) {
    this.bodyRef = bodyRef
  }

  criar() {
    this.ref = document.createElement("dashboard")
    this.bodyRef.appendChild(this.ref)
  }
}
