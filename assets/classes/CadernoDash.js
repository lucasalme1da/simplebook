const Estilo = require("./Estilo")
const Botao = require("./Botao")
const Caderno = require("./Caderno")

class CadernoDash extends Estilo {
  constructor(dashRef) {
    super()
    this.emptyWarning = false
    this.dashRefObj = dashRef
    this.dashRef = dashRef.ref
  }

  criar() {
    this.titleContainer = document.createElement("div")
    this.addEstilo(this.titleContainer, {
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

    this.titleNameContainer = document.createElement("div")
    this.titleNameContainer.textContent = "exemplo"

    this.titleButtonContainer = document.createElement("div")
    this.addEstilo(this.titleButtonContainer, {
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
      ref: this.titleButtonContainer,
      action: () => {},
      style: { backgroundColor: "var(--cor-escura)" },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    const saveAllBooks = new Botao({
      icon: "saveAllBooks",
      imageWidth: "20px",
      imageHeigth: "20px",
      width: "40%",
      height: "80%",
      ref: this.titleButtonContainer,
      action: () => {
        console.log("action")
      },
      style: { backgroundColor: "var(--cor-escura)" },
      hover: { backgroundColor: "var(--cor-clara)" }
    })

    this.contentContainer = document.createElement("div")
    this.addEstilo(this.contentContainer, {
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
      padding: "2%",
      overflowY: "overlay"
    })

    let btnAddBook = new Botao({
      icon: "addBook",
      imageWidth: "20px",
      imageHeigth: "20px",
      width: "20%",
      height: "5%",
      ref: this.contentContainer,
      action: () => {
        this.dashRefObj
          .getBag()
          .currentBag()
          .createBook()
      },
      style: {
        backgroundColor: "none",
        alignSelf: "center",
        paddingBottom: "35px"
      }
    })
    this.btnAddBook = btnAddBook
    this.ref = document.createElement("cadernos")
    this.titleContainer.append(
      this.titleNameContainer,
      this.titleButtonContainer
    )
    this.ref.append(this.titleContainer, this.contentContainer)
    this.dashRef.appendChild(this.ref)
  }

  turnOffWarning() {
    this.emptyWarning = false
    this.ref.removeChild(this.ref.firstChild)
    this.titleContainer.style.display = "flex"
    this.titleNameContainer.style.display = "inherit"
    this.addEstilo(this.contentContainer, {
      height: "89%"
    })
  }

  emptyBookWarningCreator() {
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
    mainWarningTitleContainer.textContent = "Nenhum Caderno Criado!"
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
      "Clique no + abaixo para criar seu novo caderno ;)"
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

    this.addEstilo(this.contentContainer, {
      height: "83%"
    })

    warningTitleContainer.append(
      mainWarningTitleContainer,
      subWarningTitleContainer
    )

    mainWarningTitleContainer.animate(
      [
        {
          opacity: "0.5"
        },
        {
          opacity: "1"
        }
      ],
      {
        duration: this.animationTimes.slow
      }
    )

    let anim2 = subWarningTitleContainer.animate(
      [
        {
          opacity: "0.5"
        },
        {
          opacity: "1"
        }
      ],
      {
        duration: this.animationTimes.slow
      }
    )

    anim2.onfinish = () => {
      this.addEstilo(subWarningTitleContainer, {
        opacity: "1"
      })
      this.addEstilo(mainWarningTitleContainer, {
        opacity: "1"
      })
    }

    this.ref.insertBefore(warningTitleContainer, this.ref.firstChild)
  }

  getObjBook() {
    return Caderno
  }
}

module.exports = CadernoDash
