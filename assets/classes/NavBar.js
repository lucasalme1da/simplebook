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

    const tabsContainer = document.createElement('div')

    const plusContainer = document.createElement('div')

    this.addEstilo(tabsContainer, {
      maxWidth: '90%',
      height: '100%',
      display: 'flex',
      paddingLeft: '10px',
      alignItems: 'flex-end',
    })

    this.addEstilo(plusContainer, {
      width: '5%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
    })

    this.addEstilo(tabs, {
      width: '80%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
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
    this.tabs = []
    this.tabs.push(new NavTabs({ text: 'Folha 1', ref: tabsContainer, tabs: this.tabs }))
    this.tabs.push(new NavTabs({ text: 'Folha 2', ref: tabsContainer, tabs: this.tabs }))
    const tabsElements = this.tabs.map(tab => tab.ref)
    tabsContainer.append(...tabsElements)
    const novaAba = new Botao({
      icon: 'plus',
      width: '30px',
      height: '30px',
      imageWidth: '12px',
      imageHeight: '12px',
      ref: plusContainer,
      action: () => {
        this.tabs.push(new NavTabs({ text: 'Folha 1', ref: tabsContainer, tabs: this.tabs }))
        console.log('action')
      },
      style: {
        borderRadius: '50%',
        backgroundColor: 'var(--cor-media)',
        marginLeft: '10px',
        marginBottom: '5px',
        flexShrink: 0
      }
    })
    tabs.append(tabsContainer, plusContainer)
    novaAba.hover(novaAba.ref, { backgroundColor: 'var(--cor-clara)' })
    this.ref.append(tabs, buttons)
    this.bodyRef.appendChild(this.ref);

  }
}

const navBar = new NavBar();


