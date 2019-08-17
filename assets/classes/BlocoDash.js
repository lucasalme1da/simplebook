const Estilo = require("./Estilo")
const Botao = require("./Botao")

class BlocoDash extends Estilo {
  constructor(dashRef) {
    super()
    this.dashRef = dashRef.ref
    this.navBar = dashRef.navBar
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
    dragging(blockImgContainer, this)
    dragging(blockListContainer, this)
    dragging(blockTableContainer, this)
    dragging(blockGeometryContainer, this)
    dragging(blockEquationContainer, this)

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
  div.onmousedown = function (event) {
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
    console.log(ref.parsePx(placeholder.style.left))


    document.onmouseup = () => {
      document.body.removeChild(placeholder)
      ref.navBar.currentPage().criarBloco({
        type: 'Texto',
        posX: ref.parsePx(placeholder.style.left),
        posY: ref.parsePx(placeholder.style.top)
      })
      placeholder.onmouseup = null
      document.onmouseup = () => { }
    }
  }

  div.ondragstart = function () {
    return false
  }
}

module.exports = BlocoDash
