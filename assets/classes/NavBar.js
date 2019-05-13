const Estilo = require('./Estilo')
const Botao = require('./Botao')
const NavTabs = require('./NavTabs')

class NavBar extends Estilo {
  constructor() {
    super()
    this.bodyRef = document.getElementsByTagName("BODY")[0];
    this.criar()
  }

  criar() {
    this.ref = document.createElement("nav");
    this.addEstilo(this.ref, {
      position: 'fixed',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      zIndex: '2',
      borderBottom: '9px solid var(--cor-clara)',
    })
    const tabs = document.createElement('div')

    const buttons = document.createElement('div')
    this.addEstilo(tabs, {
      width: '80%',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-end',

    })
    this.addEstilo(buttons, {
      width: '20%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    })
    const botao1 = new Botao({
      icon: 'hamburger',
      width: '10%',
      height: '60%',
      ref: buttons,
      action: () => { console.log('action') }
    })
    const botao2 = new Botao({
      icon: 'hamburger',
      width: '10%',
      height: '60%',
      ref: buttons,
      action: () => { console.log('action') }
    })
    const botao3 = new Botao({
      icon: 'hamburger',
      width: '10%',
      height: '60%',
      ref: buttons,
      action: () => { console.log('action') }
    })
    this.addEstilo(this.ref, {
      display: 'flex',
    })
    this.tabs = [
      new NavTabs({ text: 'Folha 1', ref: tabs }),
      new NavTabs({ text: 'Folha 2', ref: tabs })
    ]
    const tabsElements = this.tabs.map(tab => tab.ref)
    tabs.append(...tabsElements)
    this.ref.append(tabs, buttons)
    this.bodyRef.appendChild(this.ref);

  }
}

const navBar = new NavBar();


