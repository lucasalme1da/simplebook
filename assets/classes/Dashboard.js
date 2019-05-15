class Dashboard {
  constructor(bodyRef) {
    this.bodyRef = bodyRef;
  }

  criar() {
    this.ref = document.createElement("dashboard");
    this.bodyRef.appendChild(this.ref);
  }
}

module.exports = Dashboard;


