class NavBar {
  constructor() {
    this.bodyRef = document.getElementsByTagName("BODY")[0];
  }

  criar() {
    this.ref = document.createElement("NAV");
    this.bodyRef.appendChild(this.ref);
  }
}

const navBar = new NavBar();
let dashboard = require("./Dashboard");
dashboard = new dashboard(navBar.bodyRef);

navBar.criar();
dashboard.criar();
