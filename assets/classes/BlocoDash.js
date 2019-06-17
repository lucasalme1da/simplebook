const Estilo = require("./Estilo")
const Botao = require("./Botao")

class BlocoDash extends Estilo {
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
        // newBook(this, contentContainer)
      },
      style: {
        draggable: "false",
        cursor: "grab",
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
        // newBook(this, contentContainer)
      },
      style: {
        draggable: "false",
        cursor: "grab",
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
        // newBook(this, contentContainer)
      },
      style: {
        draggable: "false",
        cursor: "grab",
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
        // newBook(this, contentContainer)
      },
      style: {
        draggable: "false",
        cursor: "grab",
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
        // newBook(this, contentContainer)
      },
      style: {
        draggable: "false",
        cursor: "grab",
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
        // newBook(this, contentContainer)
      },
      style: {
        draggable: "false",
        cursor: "grab",
        backgroundColor: "#B200E6",
        alignSelf: "center"
      }
    })

    // Making all "manually" draggable
    dragging(blockTextContainer, this)
    dragging(blockImgContainer)
    dragging(blockListContainer)
    dragging(blockTableContainer)
    dragging(blockGeometryContainer)
    dragging(blockEquationContainer)

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

function dragging(div, ref) {
  div.onmousedown = function(event) {
    let placeholder = div.cloneNode(true)
    let shiftX = event.clientX - div.getBoundingClientRect().left
    let shiftY = event.clientY - div.getBoundingClientRect().top

    placeholder.style.width = div.offsetWidth + "px"
    placeholder.style.height = div.offsetHeight + "px"
    placeholder.firstChild.style.cursor = "grabbing"
    placeholder.style.position = "absolute"
    placeholder.style.zIndex = 1000

    document.body.append(placeholder)

    moveAt(event.pageX, event.pageY)

    function moveAt(pageX, pageY) {
      placeholder.style.left = pageX - shiftX + "px"
      placeholder.style.top = pageY - shiftY - div.offsetHeight / 2 + "px"
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY)
    }

    document.addEventListener("mousemove", onMouseMove)

    document.onmouseup = function() {
      document.body.removeChild(placeholder)
      document.removeEventListener("mousemove", onMouseMove)
      placeholder.onmouseup = null
    }
  }

  div.ondragstart = function() {
    return false
  }
}

// function dragg(div, child) {
//   div.onmousedown = function(event) {
//     let block = div.cloneNode(true)
//     child.insertBefore(block, child.firstChild)
//     div.style.width = block.offsetWidth + "px"
//     div.style.height = block.offsetHeigh + "px"

//     let shiftX = event.clientX - div.getBoundingClientRect().left
//     let shiftY = event.clientY - div.getBoundingClientRect().top

//     div.style.position = "absolute"
//     div.style.zIndex = 1000
//     document.body.append(div)

//     moveAt(event.pageX, event.pageY)

//     function moveAt(pageX, pageY) {
//       div.style.left = pageX - shiftX + "px"
//       div.style.top = pageY - shiftY + "px"
//     }

//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY)
//     }

//     document.addEventListener("mousemove", onMouseMove)

//     div.onmouseup = function() {
//       document.removeEventListener("mousemove", onMouseMove)
//       div.onmouseup = null
//     }
//   }

//   div.ondragstart = function() {
//     return false
//   }
// }

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
//   newBook.append(bookButtonContainer)
//   mochila.insertBefore(newBook, mochila.lastChild)
// }

// function delBook(mochila, caderno) {
//   mochila.removeChild(caderno)
// }

module.exports = BlocoDash
