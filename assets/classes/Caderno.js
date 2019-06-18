const Estilo = require("./Estilo")
const Botao = require("./Botao")
let bookCounter = 0

class Caderno extends Estilo {
  constructor(dashRef) {
    super()
    this.dashRef = dashRef.ref
  }

  criar() {
    const titleContainer = document.createElement("div")
    titleContainer.textContent = "Mochila 1"
    this.addEstilo(titleContainer, {
      width: "93%",
      height: "5%",
      marginTop: "5.5%",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      backgroundColor: "#A200D1",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      paddingLeft: "2%"
    })

    const titleButtonContainer = document.createElement("div")
    this.addEstilo(titleButtonContainer, {
      width: "35%",
      height: "100%",
      backgroundColor: "var(--cor-media)",
      display: "flex",
      justifyContent: "space-evenly",
      borderRadius: "8px",
      alignItems: "center"
    })

    const saveThisBook = new Botao({
      icon: "saveThisBook",
      imageWidth: "20px",
      imageHeigth: "20px",
      width: "40%",
      height: "80%",
      ref: titleButtonContainer,
      action: () => {
        console.log("action")
      },
      style: { backgroundColor: "var(--cor-escura)" },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    const saveAllBooks = new Botao({
      icon: "saveAllBooks",
      imageWidth: "20px",
      imageHeigth: "20px",
      width: "40%",
      height: "80%",
      ref: titleButtonContainer,
      action: () => {
        console.log("action")
      },
      style: { backgroundColor: "var(--cor-escura)" },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    const contentContainer = document.createElement("div")
    this.addEstilo(contentContainer, {
      width: "91%",
      height: "89%",
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
      imageHeigth: "20px",
      width: "20%",
      height: "5%",
      ref: contentContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "none",
        alignSelf: "center"
      }
    })
    this.ref = document.createElement("cadernos")
    titleContainer.append(titleButtonContainer)
    this.ref.append(titleContainer, contentContainer)

    this.dashRef.appendChild(this.ref)
    document.createElement("div").length
  }
}

function newBook(caderno, mochila) {
  let newBook = document.createElement("caderno")
  caderno.addEstilo(newBook, {
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
  caderno.hover(newBook, {
    backgroundColor: "var(--cor-clara)"
  })

  const newBookName = document.createElement("p")
  newBookName.textContent = "Novo Caderno " + ("(" + ++bookCounter + ")")
  newBookName.ondblclick = () => {
    caderno.addEstilo(newBookName, {
      transitionTimingFunction: "ease",
      textDecoration: "underline white"
    })
    newBookName.contentEditable = true
    newBookName.onkeydown = function(event) {
      if (event.keyCode == 13) {
        newBookName.contentEditable = false
        caderno.addEstilo(newBookName, {
          textDecoration: "none"
        })
      }
    }
  }

  const bookButtonContainer = document.createElement("div")
  caderno.addEstilo(bookButtonContainer, {
    width: "30%",
    height: "100%",
    backgroundColor: "none",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  })

  const favoriteBook = new Botao({
    icon: "favoriteBook",
    imageWidth: "18px",
    imageHeigth: "18px",
    width: "40%",
    height: "80%",
    ref: bookButtonContainer,
    action: () => {
      console.log("action")
    },
    hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
  })

  const deleteBook = new Botao({
    icon: "deleteBook",
    imageWidth: "20px",
    imageHeigth: "20px",
    width: "40%",
    height: "80%",
    ref: bookButtonContainer,
    action: () => {
      delBook(mochila, newBook)
    },
    hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
  })

  newBook.append(newBookName)
  newBook.append(bookButtonContainer)
  mochila.insertBefore(newBook, mochila.lastChild)
}

function delBook(mochila, caderno) {
  mochila.removeChild(caderno)
}

module.exports = Caderno
