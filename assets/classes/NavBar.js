const Estilo = require("./Estilo")
const Botao = require("./Botao")
const NavTabs = require("./NavTabs")
const Dashboard = require("./Dashboard")
const fs = require("fs")
const { clipboard, Tray } = require("electron")
const { app, globalShortcut } = require("electron")
this.Dashboard = Dashboard

class NavBar extends Estilo {
  constructor() {
    super()
    this.currentTab = null
    this.bodyRef = document.getElementsByTagName("BODY")[0]
    this.folhaContainer = document.getElementsByTagName("folhacontainer")[0]
    this.scrollPadding = 20
    this.scrollAdd = 500

    this.loadedFonts = { fonts: [] }
    this.loadFonts()
    this.limiteAbas = 10
    this.moreModalAberto = false
    this.windowOnMouseMoveActions = []
    this.zIndexBlocoMin = 10000
    this.zIndexBlocoMax = 20000
    this.criar()

    this.dashBook = new Dashboard({
      bodyRef: this.bodyRef,
      dashType: "caderno",
      navBar: this
    })
    this.dashBlock = new Dashboard({
      bodyRef: this.bodyRef,
      dashType: "blocos",
      navBar: this
    })
    this.dashBag = new Dashboard({
      bodyRef: this.bodyRef,
      dashType: "mochila",
      navBar: this
    })
    this.dashs = [this.dashBook, this.dashBag, this.dashBlock]
    this.lastActiveTabIndex = -1
    this.dashBag.getBag().load()

    let blocos = [
      {
        type: "Texto",
        key: 84,
        width: 100,
        height: 50
      },
      {
        type: "Imagem",
        key: 73,
        width: 400,
        height: 400
      },
      {
        type: "Lista",
        key: 76,
        width: 400,
        height: 400
      },
      {
        type: "Audio",
        key: 75,
        width: 380,
        height: 100
      },
      {
        type: "Tabela",
        key: 71,
        width: 400,
        height: 400
      },
      {
        type: "Video",
        key: 74,
        width: 600,
        height: 500
      },
      {
        type: "GravadorAudio",
        key: 79,
        width: 500,
        height: 150
      },
      {
        type: "Equacao",
        key: 69,
        width: 500,
        height: 400
      }
    ]


    window.addEventListener('keydown', e => {

      let folha = this.dashBag.getBag().currentBag().currentBook().selectedPage

      if (folha) {
        if (e.ctrlKey) {
          let blocoACriar = blocos.find(bloco => bloco.key == e.keyCode)
          if (blocoACriar) {
            const { x, y } = this.getMousePos(
              blocoACriar.width,
              blocoACriar.height
            )
            folha.criarBloco({
              type: blocoACriar.type,
              posX: x,
              posY: y,
              initialWidth: blocoACriar.width,
              initialHeight: blocoACriar.height
            })
          }
        }
      }


    }, false)




    window.addEventListener('mousemove', e => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    }, false)


    window.addEventListener('mousewheel', e => {
      if (e.wheelDelta < 0) {
        const height = this.folhaContainer.parentElement.offsetHeight
        const scrollTop = this.folhaContainer.parentElement.scrollTop
        const scrollHeight = this.folhaContainer.scrollHeight

        const diff = scrollHeight - (height + scrollTop)
        if (diff <= this.scrollPadding) {
          const height =
            this.parsePx(this.folhaContainer.style.height) + this.scrollAdd
          this.folhaContainer.style.height = this.reparsePx(height)
          let folha = this.dashBag
            .getBag()
            .currentBag()
            .currentBook().selectedPage
          folha.height = height
        }
      }
    }, false)


    this.folhaContainer.addEventListener('paste', e => {

      let folha = this.dashBag.getBag().currentBag().currentBook().selectedPage

      const image = clipboard.readImage()
      this.countImgs()

      if (!image.isEmpty()) {
        const { height, width } = image.getSize()
        const { x, y } = this.getMousePos(width, height)

        fs.writeFileSync(
          `./imgs/Imagem-${this.imageCount + 1}.jpg`,
          image.toJPEG(100)
        )
        folha.criarImagem({
          posX: x,
          posY: y,
          initialWidth: width,
          initialHeight: height,
          src: `./imgs/Imagem-${this.imageCount + 1}.jpg`
        })
      }
    }, false)

  }

  getMousePos(width, height) {
    let x = this.mouseX - this.folhaContainer.offsetLeft - width / 2
    let y =
      this.mouseY +
      this.folhaContainer.parentElement.scrollTop -
      this.folhaContainer.offsetTop -
      height / 2
    return { x, y }
  }

  countImgs() {
    let images = fs.readdirSync("./imgs")
    if (images.length > 0) {
      let imagesNumber = images.map(image => parseInt(image.split("-")[1]))
      this.imageCount = Math.max(...imagesNumber)
    } else {
      this.imageCount = 0
    }
  }

  criar() {
    let container = document.createElement("div")
    this.addEstilo(container, {
      height: "93vh",
      width: "95vw",
      marginTop: "7vh",
      backgroundColor: "white",
      position: "relative",
      overflowY: "auto",
      overflowX: "hidden"
    })

    this.folhaContainer = document.createElement("folhaContainer")

    this.disableHoldSelectionAndDrag(this.folhaContainer)

    container.appendChild(this.folhaContainer)

    this.addEstilo(this.folhaContainer, {
      height: this.reparsePx(window.innerHeight),
      display: "block",
      width: "100%",
      backgroundColor: "white",
      position: "relative"
    })

    this.ref = document.createElement("nav")
    this.addEstilo(this.ref, {
      position: "fixed",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      zIndex: (this.zIndexBlocoMax + 2),
      borderBottom: "9px solid var(--cor-clara)"
    })

    // More Nav Tabs
    this.moreNavTabs = document.createElement("more")

    this.addEstilo(this.moreNavTabs, {
      display: "none",
      position: "absolute",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      padding: "10px",
      top: "6vh",
      right: "20vw",
      borderBottomLeftRadius: "8px",
      overflowY: "auto",
      maxHeight: "450px",

      zIndex: (this.zIndexBlocoMax + 2),
      backgroundColor: "var(--cor-escura)"
    })

    this.bodyRef.appendChild(this.moreNavTabs)
    //
    const tabs = document.createElement("div")

    const buttons = document.createElement("div")

    const tabsContainer = document.createElement("div")
    this.tabsContainer = tabsContainer

    const plusContainer = document.createElement("div")

    this.moreButton = new Botao({
      icon: "drop",
      width: "100px",
      height: "70%",
      text: "Mais um",
      imageWidth: "12px",
      imageHeight: "12px",
      ref: plusContainer,
      style: {
        display: "none",
        marginLeft: "10px",
        marginBottom: "5px",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "var(--cor-media)"
      },
      action: () => this.abrirMoreModal()
    })

    this.addEstilo(tabsContainer, {
      maxWidth: "90%",
      height: "100%",
      display: "flex",
      paddingLeft: "10px",
      alignItems: "flex-end"
    })

    this.addEstilo(plusContainer, {
      width: "10%",
      height: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-end"
    })

    this.addEstilo(tabs, {
      width: "80%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    })
    this.addEstilo(buttons, {
      width: "20%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around"
    })

    let botao1 = new Botao({
      icon: "pencilIcon2",
      width: "10%",
      height: "60%",
      ref: buttons,
      action: () => {
        this.openDash(this.dashBlock)
      }
    })
    this.botao1 = botao1

    let botao2 = new Botao({
      icon: "bookIcon",
      width: "10%",
      height: "60%",
      ref: buttons,
      action: () => {
        this.openDash(this.dashBook)
      }
    })
    this.botao2 = botao2

    let botao3 = new Botao({
      icon: "bagIcon2",
      width: "10%",
      height: "60%",
      ref: buttons,
      action: () => {
        this.openDash(this.dashBag)
      }
    })
    this.addEstilo(this.ref, {
      display: "flex"
    })
    this.tabs = []
    // this.tabs.push(
    //   new NavTabs({
    //     text: "Folha 1",
    //     ref: tabsContainer,
    //     tabs: this.tabs,
    //     folhaContainer: this.folhaContainer,
    //     loadedFonts: this.loadedFonts
    //   })
    // )

    const tabsElements = this.tabs.map(tab => tab.ref)
    tabsContainer.append(...tabsElements)
    const novaAba = new Botao({
      icon: "plus",
      width: "30px",
      height: "30px",
      imageWidth: "12px",
      imageHeight: "12px",
      ref: plusContainer,
      action: () => {
        this.dashBag
          .getBag()
          .currentBag()
          .currentBook()
          .newPage()
      },
      style: {
        borderRadius: "50%",
        backgroundColor: "var(--cor-media)",
        marginLeft: "10px",
        marginBottom: "5px",
        flexShrink: 0
      }
    })
    this.novaAba = novaAba
    tabs.append(tabsContainer, plusContainer)
    novaAba.hover(novaAba.ref, { backgroundColor: "var(--cor-clara)" })
    this.ref.append(tabs, buttons)
    this.bodyRef.appendChild(this.ref)
    this.bodyRef.appendChild(container)
    this.addEstilo(this.bodyRef, {
      backgroundColor: "var(--cor-fundo)",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column"
    })
  }

  load() {}

  abrirMoreButton() {
    if (this.moreButton.ref.style.display != "flex") {
      this.moreButton.text.style.display = "none"
      this.addEstilo(this.moreButton.ref, { display: "flex" })
      let anim = this.moreButton.ref.animate(
        [{ width: "0px", opacity: 0 }, { width: "80px", opacity: 1 }],
        200
      )
      anim.onfinish = () =>
        this.addEstilo(this.moreButton.text, { display: "flex" })
    }
  }

  fecharMoreButton() {
    if (this.allCurrentTabs().length <= this.limiteAbas) {
      if (this.moreButton.ref.style.display != "none") {
        let anim = this.moreButton.ref.animate(
          [{ width: "80px", opacity: 1 }, { width: "0px", opacity: 0 }],
          100
        )
        anim.onfinish = () => {
          this.addEstilo(this.moreButton.ref, { display: "none" })
          this.abrirMoreModal()
        }
      }
    }
  }

  abrirMoreModal() {
    if (this.moreModalAberto) {
      let anim = this.moreNavTabs.animate(
        [{ opacity: "1" }, { opacity: "0" }],
        100
      )
      anim.onfinish = () => {
        this.addEstilo(this.moreNavTabs, { display: "none" })
        this.moreModalAberto = false
      }
    } else {
      this.addEstilo(this.moreNavTabs, { display: "flex" })
      let anim = this.moreNavTabs.animate(
        [{ top: "4vh", opacity: "0" }, { top: "6vh", opacity: "1" }],
        100
      )
      anim.onfinish = () => (this.moreModalAberto = true)
    }
  }

  atualizarNumAbas() {
    this.moreButton.text.textContent = `${this.allCurrentTabs().length -
      this.limiteAbas} mais`
  }

  openDash(targetDash) {
    if (!targetDash.isOpened()) {
      this.dashs.forEach(dash => {
        if (dash.ref != targetDash) {
          if (dash.isOpened()) dash.openDash()
        }
      })
      if (targetDash == this.dashBook) {
        targetDash.getBag().updateBooklist()
        targetDash
          .getBag()
          .currentBag()
          .updateBookInfo()
      }
      if (targetDash == this.dashBag) {
        targetDash.getBag().updateBagInfo()
      }
      targetDash.openDash()
    } else {
      targetDash.openDash()
    }
  }

  loadFonts() {
    return new Promise(resolve => {
      let fonts = fs.readdirSync(`./assets/fonts/`)
      fonts.forEach(font => {
        let name = font.substring(0, font.length - 4)
        this.loadedFonts.fonts.push(name)
        let loadedFont = new FontFace(name, `url(assets/fonts/${font})`)
        loadedFont
          .load()
          .then(function(loaded_face) {
            document.fonts.add(loaded_face)
            document.body.style.fontFamily = `"${name}", Arial`
          })
          .catch(function(error) {})
      })
    })
  }

  getDashboard() {
    return Dashboard
  }

  createTab(newPageRef, name) {
    this.currentBook = this.dashBag
      .getBag()
      .currentBag()
      .currentBook()
    let tab
    if (this.allCurrentTabs().length >= this.limiteAbas) {
      this.abrirMoreButton()
      tab = new NavTabs({
        ref: this.moreNavTabs,
        tabs: this.tabs,
        moreTabs: true,
        navbar: this,
        index: this.tabs.length + 1,
        belongsTo: this.currentBook,
        pageRef: newPageRef,
        name
      })
      this.tabs.push(tab)
      this.atualizarNumAbas()
    } else {
      tab = new NavTabs({
        ref: this.tabsContainer,
        moreTabsRef: this.moreNavTabs,
        tabs: this.tabs,
        navbar: this,
        folhaContainer: this.folhaContainer,
        index: this.tabs.length + 1,
        belongsTo: this.currentBook,
        pageRef: newPageRef,
        name
      })
      this.tabs.push(tab)
    }
    return tab
    // for (let j = 0; j < this.currentBag().cadernos.length; j++) {
    //   // console.log(this.currentBag().cadernos[j].newBook)
    //   this.currentBag().cadernos[j].newBook.style.display = "flex"
    // }
  }

  updateTabs() {
    let arrayOfElNavBars = [...document.querySelectorAll("navtab")]

    for (let i = 0; i < arrayOfElNavBars.length; i++) {
      arrayOfElNavBars[i].style.display = "none"
    }
    for (let j = 0; j < this.tabs.length; j++) {
      if (
        this.tabs[j].belongsTo ==
        this.dashBag
          .getBag()
          .currentBag()
          .currentBook()
      ) {
        this.tabs[j].ref.style.display = "flex"
        this.lastActiveTabIndex = j
      }
    }
    // this.selectLastVisibleTab()
  }

  selectLastVisibleTab() {
    if (this.tabs.length > 0 && this.lastActiveTabIndex != -1)
      this.tabs[this.lastActiveTabIndex].setActive()
  }

  currentPage() {
    for (let i = 0; i < this.tabs.length; i++) {
      if (
        this.tabs[i].belongsTo ==
        this.dashBag
          .getBag()
          .currentBag()
          .currentBook()
      ) {
        if (this.tabs[i].ref.style.display == "flex") {
          console.log(this.tabs[i])
          return this.tabs[i].pageRef
        }
      }
    }
  }

  allCurrentTabs() {
    let output = []

    this.tabs.forEach(element => {
      if (
        element.belongsTo ==
        this.dashBag
          .getBag()
          .currentBag()
          .currentBook()
      )
        output.push(element)
    })
    return output
  }

  lockDashCaderno(state) {
    if (state) {
      this.botao2.disable(true)
      this.lockDashBlocos(true)
    } else {
      this.botao2.disable(false)
      this.lockDashBlocos(false)
    }
  }

  lockDashBlocos(state) {
    if (state) {
      this.botao1.disable(true)
      this.lockTab(true)
    } else {
      this.botao1.disable(false)
      this.lockTab(false)
    }
  }

  lockTab(state) {
    if (state) {
      this.novaAba.disable(true)
    } else {
      this.novaAba.disable(false)
    }
  }
}

const navBar = new NavBar()
