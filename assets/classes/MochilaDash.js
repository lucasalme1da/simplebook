const Estilo = require("./Estilo")
const Botao = require("./Botao")
const Mochila = require("./Mochila")
const fs = require("fs")

class MochilaDash extends Estilo {
  constructor(dashRef) {
    super()
    this.dashRefObj = dashRef
    this.dashRef = dashRef.ref
    this.selectedBag = null
  }

  criar() {
    this.mochilas = [] // Vetor de mochilas

    this.titleContainer = document.createElement("div")
    this.addEstilo(this.titleContainer, {
      width: "95%",
      height: "11%",
      marginTop: "5.5%",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      backgroundColor: "var(--cor-media)",
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const imgTitleContainer = document.createElement("div")
    this.addEstilo(imgTitleContainer, {
      width: "25%",
      height: "90%",
      margin: "2%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      paddingLeft: "2%"
    })

    const bagLogo = document.createElement("img")
    bagLogo.setAttribute("src", "./assets/icons/bagLogo.svg")
    this.addEstilo(bagLogo, {
      width: "90%",
      height: "100%"
    })

    const rightTitleContainer = document.createElement("div")
    this.addEstilo(rightTitleContainer, {
      width: "75%",
      height: "90%",
      margin: "2%",
      marginLeft: "2%",
      backgroundColor: "none",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "flex-start",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnTitleContainer = document.createElement("div")
    this.addEstilo(btnTitleContainer, {
      width: "100%",
      height: "35%",
      margin: "0",
      backgroundColor: "var(--cor-media)",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const saveThisBag = new Botao({
      icon: "saveThisBook",
      imageWidth: "17px",
      imageHeight: "17px",
      width: "18%",
      height: "100%",
      ref: btnTitleContainer,
      action: () => {
        console.log(this.currentBag())
      },
      style: {
        backgroundColor: "var(--cor-escura)",
        marginLeft: "1%",
        marginRight: "1%"
      },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    const saveAllBags = new Botao({
      icon: "saveAllBooks",
      imageWidth: "18px",
      imageHeight: "18px",
      width: "18%",
      height: "100%",
      ref: btnTitleContainer,
      action: () => {
        console.log("action")
      },
      style: {
        backgroundColor: "var(--cor-escura)",
        marginLeft: "1%",
        marginRight: "1%"
      },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    this.nameRightContainer = document.createElement("div")
    this.nameRightContainer.textContent = "Mochila 1"
    this.addEstilo(this.nameRightContainer, {
      width: "100%",
      height: "25%",
      marginTop: "0",
      backgroundColor: "none",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      padding: "1%"
    })

    this.bookCounterRightContainer = document.createElement("div")
    this.bookCounter = 0
    this.bookCounterRightContainer.textContent = this.bookCounter + " Cadernos"
    this.addEstilo(this.bookCounterRightContainer, {
      width: "100%",
      height: "25%",
      margin: 0,
      backgroundColor: "none",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "16px",
      fontWeight: "normal",
      padding: "1%"
    })

    this.contentContainer = document.createElement("mochilaContentContainer")
    this.addEstilo(this.contentContainer, {
      width: "91%",
      height: "83%",
      marginTop: "2.5%",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      backgroundColor: "var(--cor-media)",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      borderRadius: "8px",
      padding: "2%",
      overflowY: "overlay"
    })

    let btnAddBook = new Botao({
      icon: "addBook",
      imageWidth: "20px",
      imageHeight: "20px",
      width: "20%",
      height: "5%",
      ref: this.contentContainer,
      action: () => {
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
        this.createBag(this.contentContainer)
      },
      style: {
        backgroundColor: "none",
        alignSelf: "center",
        paddingBottom: "35px"
      }
    })
    this.btnAddBook = btnAddBook

    this.ref = document.createElement("mochilas")
    rightTitleContainer.append(
      this.nameRightContainer,
      this.bookCounterRightContainer,
      btnTitleContainer
    )
    imgTitleContainer.append(bagLogo)
    this.titleContainer.append(imgTitleContainer, rightTitleContainer)
    this.ref.append(this.titleContainer, this.contentContainer)
    this.dashRef.appendChild(this.ref)

    this.loadBags().catch(erro => {})
  }

  load() {
    let cadernos = this.CadernosDasMochilas
    this.mochilas.forEach((mochila, indice) => {
      mochila.load(cadernos[indice])

      // cadernos[indice].forEach(caderno => {
      //   const { name, folhas } = caderno
      //   let cad = mochila.createBook(name)
      //   folhas.forEach(folha => {
      //     const { exportBlocos, name } = folha
      //     cad.newPage(name)
      //   })

      // })
    })
  }

  loadBags() {
    return new Promise((resolve, reject) => {
      let bags = fs.readdirSync("./save")
      let cadernos = []
      if (!bags.length) reject()
      bags.forEach(bag => {
        let data = fs.readFileSync(`./save/${bag}`)

        data = JSON.parse(data)
        console.log(data)
        const { cadernosData } = data
        cadernos.push(cadernosData)
        this.createBag(this.contentContainer, data.name)
      })
      this.CadernosDasMochilas = cadernos
      resolve()
    })
  }

  createBag(container, name) {
    this.mochilas.push(
      new Mochila({
        bagRef: this,
        containerRef: container,
        name: name,
        btnAdd: this.btnAddBook
      })
    )
    this.selectBag(this.mochilas[this.mochilas.length - 1])
    if (this.emptyWarning) this.turnOffWarning()
    if (this.mochilas.length == 1) this.dashRefObj.navBar.lockDashCaderno(false)
    // this.dashRefObj.navBar.lockTab(true)
    // this.dashRefObj.getBook().emptyBookWarningCreator()
  }

  selectBag(bagRef) {
    bagRef.isSelected = true
    for (let i = 0; i < this.mochilas.length; i++) {
      if (bagRef == this.mochilas[i]) {
        bagRef.addEstilo(bagRef.newBag, {
          backgroundColor: "var(--cor-clara)"
        })
      } else {
        this.mochilas[i].isSelected = false
        this.mochilas[i].addEstilo(this.mochilas[i].newBag, {
          backgroundColor: "var(--cor-escura)"
        })
      }
    }
    // this.updateBagInfo()
    this.currentBag().updateBookInfo()
    this.esconderMochilas()
    this.dashRefObj.navBar.updateTabs()
    if (
      this.currentBag().currentBook() != undefined &&
      this.currentBag().currentBook().lastTabSelected != null
    ) {
      this.currentBag()
        .currentBook()
        .lastTabSelected.setActive()
    } else {
      this.updateBooklist()
    }
    if (this.currentBag().cadernos.length > 0) {
      this.dashRefObj.navBar.lockTab(false)
    } else {
      this.dashRefObj.navBar.lockTab(true)
    }
    this.updateBagInfo()
  }

  currentBag() {
    for (let i = 0; i < this.mochilas.length; i++) {
      if (this.mochilas[i].isSelected) return this.mochilas[i]
    }
  }

  updateBagInfo() {
    if (this.currentBag() != undefined) {
      this.nameRightContainer.textContent = this.currentBag().bagName
      this.bookCounter = this.currentBag().cadernos.length
      this.bookCounterRightContainer.textContent =
        this.bookCounter + " Cadernos"
    }
  }

  turnOffWarning() {
    this.emptyWarning = false
    this.ref.removeChild(this.ref.firstChild)
    this.titleContainer.style.display = "flex"
  }

  emptyBagWarningCreator() {
    this.emptyWarning = true
    this.titleContainer.style.display = "none"
    const warningTitleContainer = document.createElement("div")
    this.addEstilo(warningTitleContainer, {
      width: "95%",
      height: "11%",
      marginTop: "5.5%",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      backgroundColor: "var(--cor-media)",
      display: "flex",
      flexFlow: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const mainWarningTitleContainer = document.createElement("div")
    mainWarningTitleContainer.textContent = "Nenhuma Mochila Criada!"
    this.addEstilo(mainWarningTitleContainer, {
      width: "100%",
      height: "25%",
      marginTop: "0",
      backgroundColor: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      textAlign: "center",
      padding: "1%"
    })

    const subWarningTitleContainer = document.createElement("div")
    subWarningTitleContainer.textContent =
      "Clique no + abaixo para criar sua nova mochila ;)"
    this.addEstilo(subWarningTitleContainer, {
      width: "100%",
      height: "25%",
      margin: 0,
      backgroundColor: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "16px",
      fontWeight: "normal",
      textAlign: "center",
      padding: "1%"
    })

    warningTitleContainer.append(
      mainWarningTitleContainer,
      subWarningTitleContainer
    )
    this.ref.insertBefore(warningTitleContainer, this.ref.firstChild)
  }

  updateBooklist() {
    // substituir query selector por uma funcao que varra os cadernos atuais
    let arrayOfElBooks = []
    this.mochilas.forEach(element => {
      for (let j = 0; j < element.cadernos.length; j++) {
        arrayOfElBooks.push(element.cadernos[j].newBook)
      }
    })

    // let arrayOfElBooks = [
    //   ...document.querySelectorAll("cadernos")[0].children[1].children
    // ]

    // console.log("total de cadernos ->", arrayOfElBooks2)
    console.log("total de cadernos ->", arrayOfElBooks)

    // console.log("total de cadernos ->", arrayOfElBooks)
    for (let i = 0; i < arrayOfElBooks.length; i++) {
      arrayOfElBooks[i].style.display = "none"
    }

    // console.log("cadernos desta mochila ->", this.currentBag().cadernos)
    for (let j = 0; j < this.currentBag().cadernos.length; j++) {
      this.currentBag().cadernos[j].newBook.style.display = "flex"
    }

    if (
      this.currentBag().cadernos.length > 0 &&
      this.dashRefObj.getBook().emptyWarning == true
    ) {
      this.dashRefObj.getBook().turnOffWarning()
    }
    // console.log("chamaste?")

    if (
      this.currentBag().cadernos.length == 0 &&
      this.dashRefObj.getBook().emptyWarning == false
    ) {
      this.dashRefObj.getBook().emptyBookWarningCreator()
    }
    // console.log(this.currentBag())

    // if (this.currentBag().cadernos.length >= 0)
    //   this.dashRefObj.getBook().turnOffWarning()

    // debugger
  }

  esconderMochilas() {
    for (let i = 0; i < this.mochilas.length; i++) {
      this.mochilas[i].esconderCadernos()
    }
  }

  mostrarMochilas() {
    for (let i = 0; i < this.mochilas.length; i++) {
      this.mochilas[i].mostrarCadernos()
    }
  }
}

module.exports = MochilaDash
