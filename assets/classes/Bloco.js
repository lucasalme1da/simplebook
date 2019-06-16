const Estilo = require("./Estilo")
const Botao = require("./Botao")

class Bloco extends Estilo {
  constructor(dashRef) {
    super()
    this.dashRef = dashRef
  }

  criar() {
    const backContainer = document.createElement("div")
    this.addEstilo(backContainer, {
      width: "95%",
      height: "96.5%",
      marginTop: "5.5%",
      marginLeft: "2.5%",
      marginRight: "2.5%",
      backgroundColor: "#A200D1",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "flex-stretch",
      alignContent: "flex-start",
      flexFlow: "row wrap",
      borderRadius: "8px"
    })

    const blockTextContainer = document.createElement("div")
    this.addEstilo(blockTextContainer, {
      width: "45.5%",
      height: "11%",
      marginTop: "2.5%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnBlockText = new Botao({
      icon: "blockText",
      imageWidth: "80%",
      imageHeight: "80%",
      width: "100%",
      height: "100%",
      ref: blockTextContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    const blockImgContainer = document.createElement("div")
    this.addEstilo(blockImgContainer, {
      width: "45.5%",
      height: "11%",
      marginTop: "2.5%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnBlockImg = new Botao({
      icon: "blockImg",
      imageWidth: "50%",
      imageHeight: "50%",
      width: "100%",
      height: "100%",
      ref: blockImgContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    const blockListContainer = document.createElement("div")
    this.addEstilo(blockListContainer, {
      width: "45.5%",
      height: "11%",
      marginTop: "2.5%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnBlockList = new Botao({
      icon: "blockList",
      imageWidth: "60%",
      imageHeight: "60%",
      width: "100%",
      height: "100%",
      ref: blockListContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    const blockTableContainer = document.createElement("div")
    this.addEstilo(blockTableContainer, {
      width: "45.5%",
      height: "11%",
      marginTop: "2.5%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnBlockTable = new Botao({
      icon: "blockTable",
      imageWidth: "60%",
      imageHeight: "60%",
      width: "100%",
      height: "100%",
      ref: blockTableContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    const blockGeometryContainer = document.createElement("div")
    this.addEstilo(blockGeometryContainer, {
      width: "45.5%",
      height: "11%",
      marginTop: "2.5%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnBlockGeometry = new Botao({
      icon: "blockGeometry",
      imageWidth: "50%",
      imageHeight: "50%",
      width: "100%",
      height: "100%",
      ref: blockGeometryContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    const blockEquationContainer = document.createElement("div")
    this.addEstilo(blockEquationContainer, {
      width: "45.5%",
      height: "11%",
      marginTop: "2.5%",
      backgroundColor: "var(--cor-escura)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "8px",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold"
    })

    const btnBlockEquation = new Botao({
      icon: "blockEquation",
      imageWidth: "80%",
      imageHeight: "80%",
      width: "100%",
      height: "100%",
      ref: blockEquationContainer,
      action: () => {
        newBook(this, contentContainer)
      },
      style: {
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    this.ref = document.createElement("blocos")
    backContainer.append(
      blockTextContainer,
      blockImgContainer,
      blockListContainer,
      blockTableContainer,
      blockGeometryContainer,
      blockEquationContainer
    )
    this.ref.append(backContainer)
    this.dashRef.appendChild(this.ref)
    document.createElement("div").length
  }
}

// function newBook(caderno, mochila) {
//   let newBook = document.createElement("caderno")
//   caderno.addEstilo(newBook, {
//     width: "94%",
//     height: "5%",
//     margin: "2%",
//     backgroundColor: "var(--cor-escura)",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderRadius: "8px",
//     color: "white",
//     fontSize: "15px",
//
//   })
//   caderno.hover(newBook, {
//     backgroundColor: "var(--cor-clara)"
//   })

//   const newBookName = document.createElement("p")
//   newBookName.textContent = "Novo Caderno " + ("(" + ++bookCounter + ")")
//   newBookName.ondblclick = () => {
//     caderno.addEstilo(newBookName, {
//       transitionTimingFunction: "ease",
//       textDecoration: "underline white"
//     })
//     newBookName.contentEditable = true
//     newBookName.onkeydown = function(event) {
//       if (event.keyCode == 13) {
//         newBookName.contentEditable = false
//         caderno.addEstilo(newBookName, {
//           textDecoration: "none"
//         })
//       }
//     }
//   }

//   const bookButtonContainer = document.createElement("div")
//   caderno.addEstilo(bookButtonContainer, {
//     width: "30%",
//     height: "100%",
//     backgroundColor: "none",
//     display: "flex",
//     justifyContent: "space-evenly",
//     alignItems: "center"
//   })

//   const favoriteBook = new Botao({
//     icon: "favoriteBook",
//     imageWidth: "18px",
//     imageHeigth: "18px",
//     width: "40%",
//     height: "80%",
//     ref: bookButtonContainer,
//     action: () => {
//       console.log("action")
//     },
//     hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
//   })

//   const deleteBook = new Botao({
//     icon: "deleteBook",
//     imageWidth: "20px",
//     imageHeigth: "20px",
//     width: "40%",
//     height: "80%",
//     ref: bookButtonContainer,
//     action: () => {
//       delBook(mochila, newBook)
//     },
//     hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
//   })

//   newBook.append(newBookName)
//https://github.com/lucasalme1da/simplebook.git/   newBook.append(bookButtonContainer)
//   mochila.insertBefore(newBook, mochila.lastChild)
// }

// function delBook(mochila, caderno) {
//   mochila.removeChild(caderno)
// }

module.exports = Bloco
