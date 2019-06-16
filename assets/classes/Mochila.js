const Estilo = require("./Estilo")
const Botao = require("./Botao")
let bagCounter = 0

class Mochila extends Estilo {
  constructor(dashRef) {
    super()
    this.dashRef = dashRef
  }

  criar() {
    const titleContainer = document.createElement("div")
    this.addEstilo(titleContainer, {
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
      margin: 0,
      backgroundColor: "var(--cor-media)",
      display: "flex",
      justifyContent: "flex-start",
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
        console.log("action")
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

    const deleteBag = new Botao({
      icon: "deleteBook",
      imageWidth: "20px",
      imageHeight: "20px",
      width: "18%",
      height: "100%",
      ref: btnTitleContainer,
      action: () => {
        console.log("action")
      },
      style: {
        backgroundColor: "var(--cor-escura)",
        marginLeft: "40%",
        marginRight: "1%"
      },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    const nameRightContainer = document.createElement("div")
    nameRightContainer.textContent = "Mochila 1"
    this.addEstilo(nameRightContainer, {
      width: "100%",
      height: "25%",
      margin: 0,
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

    const bookCounterRightContainer = document.createElement("div")
    bookCounterRightContainer.textContent = "7 Cadernos"
    this.addEstilo(bookCounterRightContainer, {
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

    const contentContainer = document.createElement("div")
    this.addEstilo(contentContainer, {
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
      padding: "2%"
    })

    const btnAddBook = new Botao({
      icon: "addBook",
      imageWidth: "20px",
      imageHeight: "20px",
      width: "20%",
      height: "5%",
      ref: contentContainer,
      action: () => {
        newBag(this, contentContainer)
      },
      style: {
        backgroundColor: "none",
        alignSelf: "center"
      }
    })

    this.ref = document.createElement("mochilas")
    rightTitleContainer.append(
      btnTitleContainer,
      nameRightContainer,
      bookCounterRightContainer
    )

    imgTitleContainer.append(bagLogo)
    titleContainer.append(imgTitleContainer, rightTitleContainer)
    this.ref.append(titleContainer, contentContainer)
    this.dashRef.appendChild(this.ref)
  }
}

function newBag(mochila, container) {
  let newBag = document.createElement("mochila")

  mochila.addEstilo(newBag, {
    width: "94%",
    height: "5%",
    margin: "2%",
    backgroundColor: "var(--cor-escura)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "8px",
    color: "white",
    fontSize: "15px",
    paddingLeft: "2%"
  })
  mochila.hover(newBag, {
    backgroundColor: "var(--cor-clara)"
  })

  const newBagName = document.createElement("p")
  newBagName.textContent = "Nova Mochila " + ("(" + ++bagCounter + ")")
  newBagName.ondblclick = () => {
    mochila.addEstilo(newBagName, {
      transitionTimingFunction: "ease",
      textDecoration: "underline white"
    })
    newBagName.contentEditable = true
    newBagName.onkeydown = function(event) {
      if (event.keyCode == 13) {
        newBagName.contentEditable = false
        mochila.addEstilo(newBagName, {
          textDecoration: "none"
        })
      }
    }
  }

  const bagButtonContainer = document.createElement("div")
  mochila.addEstilo(bagButtonContainer, {
    width: "30%",
    height: "100%",
    backgroundColor: "none",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  })

  const favoriteBag = new Botao({
    icon: "favoriteBook",
    imageWidth: "18px",
    imageHeight: "18px",
    width: "40%",
    height: "80%",
    ref: bagButtonContainer,
    action: () => {
      console.log("action")
    },
    hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
  })

  const deleteBag = new Botao({
    icon: "deleteBook",
    imageWidth: "20px",
    imageHeight: "20px",
    width: "40%",
    height: "80%",
    ref: bagButtonContainer,
    action: () => {
      delBag(container, newBag)
    },
    hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
  })

  newBag.append(newBagName)
  newBag.append(bagButtonContainer)
  container.insertBefore(newBag, container.lastChild)
}

function delBag(container, mochila) {
  container.removeChild(mochila)
}

module.exports = Mochila
