const Estilo = require("./Estilo")
const Botao = require("./Botao")
const Caderno = require("./Caderno")
let bagCounter = 0

class Mochila extends Estilo {
  constructor(options) {
    super()
    this.criar(options)
    this.bagDashRef = options.bagRef
  }

  criar(options) {
    this.cadernos = [] // Vetor de cadernos

    this.newBag = document.createElement("mochila")
    this.addEstilo(this.newBag, {
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
      cursor: "pointer",
      paddingLeft: "2%",
      position: "relative",
      top: "0vh",
      transition: "all 0.3s ease"
    })

    // Editar Nome da Bolsa
    const newBagName = document.createElement("p")

    newBagName.textContent = "Nova Mochila " + ("(" + ++bagCounter + ")")
    this.bagName = newBagName.textContent

    this.addRenamable(newBagName, 19, this)

    const bagButtonContainer = document.createElement("div")
    this.addEstilo(bagButtonContainer, {
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
      action: () => {},
      hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
    })

    const deleteBag = new Botao({
      icon: "deleteBook",
      imageWidth: "20px",
      imageHeight: "20px",
      width: "40%",
      height: "80%",
      animation: "true",
      animationFillMode: "true",
      ref: bagButtonContainer,
      action: () => {
        this.deleteBag(options.containerRef, this.newBag)
      },
      hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
    })

    this.newBag.onclick = e => {
      if (e.target == this.newBag || e.target == newBagName)
        options.bagRef.selectBag(this)
    }

    this.newBag.onmouseover = () => {
      if (!this.currentBag())
        this.newBag.style.backgroundColor = "var(--cor-clara)"
    }

    this.newBag.onmouseout = () => {
      if (!this.currentBag())
        this.newBag.style.backgroundColor = "var(--cor-escura)"
    }

    this.newBag.append(newBagName)
    this.newBag.append(bagButtonContainer)
    options.containerRef.insertBefore(
      this.newBag,
      options.containerRef.lastChild
    )

    let anim = this.newBag.animate(
      [
        {
          opacity: "0",
          top: "-1vh"
        },
        {
          opacity: "1",
          top: "0vh"
        }
      ],
      {
        duration: this.animationTimes.slow
      }
    )

    this.bagRef = options.bagRef
  }

  deleteBag(ref, bag) {
    if (confirm("Tem certeza que deseja excluir essa mochila?")) {
      let anim = bag.animate(
        [
          {
            opacity: "1",
            transform: "scale(1)",
            height: "4%"
          },
          {
            opacity: "0",
            transform: "scale(0.8)",
            height: "0%"
          }
        ],
        {
          duration: this.animationTimes.slow
        }
      )

      anim.onfinish = () => {
        let bagLength = this.bagRef.mochilas.length
        let bagArray = this.bagRef.mochilas
        if (bagLength > 1) {
          if (this.isSelected) {
            this.bagRef.selectBag(bagArray[bagLength - 2])
          }
        }
        for (let i = 0; i <= bagLength; i++) {
          if (bagArray[i] == this) bagArray.splice(i, 1)
        }
        ref.removeChild(bag)
        if (this.bagRef.mochilas.length == 1) this.bagRef.selectBag(bagArray[0])
        if (this.bagRef.mochilas.length == 0)
          this.bagRef.emptyBagWarningCreator()
      }
    }
  }

  getBagName() {
    return this.bagName
  }

  currentBag() {
    return this.isSelected
  }

  createBook() {
    this.cadernos.push(
      new Caderno({
        thisBag: this,
        bookRef: this.bagRef.dashRefObj.getBook(),
        containerRef: this.bagRef.dashRefObj.getBook().contentContainer
      })
    )
    this.selectBook(this.cadernos[this.cadernos.length - 1])
    if (this.bagRef.dashRefObj.getBook().emptyWarning)
      this.bagRef.dashRefObj.getBook().turnOffWarning()
  }

  selectBook(bookRef) {
    this.previousBook = this.currentBook()
    bookRef.isSelected = true
    for (let i = 0; i < this.cadernos.length; i++) {
      if (bookRef == this.cadernos[i]) {
        bookRef.addEstilo(bookRef.newBook, {
          backgroundColor: "var(--cor-clara)"
        })
      } else {
        this.cadernos[i].isSelected = false
        this.cadernos[i].addEstilo(this.cadernos[i].newBook, {
          backgroundColor: "var(--cor-escura)"
        })
      }
    }
    console.log(this.bagRef.dashRefObj.navBar.updateTabs())
    this.esconderCadernos()
    this.bagRef.dashRefObj.navBar.updateTabs()
  }

  previousBook() {
    return this.previousBook
  }

  currentBook() {
    for (let i = 0; i < this.cadernos.length; i++) {
      if (this.cadernos[i].isSelected) return this.cadernos[i]
    }
  }

  updateBookInfo() {
    console.log(this.bagName)
    this.bagRef.dashRefObj.getBook().titleNameContainer.textContent = this.bagName
  }

  esconderCadernos() {
    for (let i = 0; i < this.cadernos.length; i++) {
      this.cadernos[i].esconderFolhas()
    }
  }

  mostrarCadernos() {
    for (let i = 0; i < this.cadernos.length; i++) {
      this.cadernos[i].mostrarFolhas()
    }
  }
}

module.exports = Mochila
