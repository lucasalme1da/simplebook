const Estilo = require("./Estilo")
const Botao = require("./Botao")
const Folha = require("./Folha")
let bookCounter = 0

class Caderno extends Estilo {
  constructor(options) {
    super()
    this.criar(options)

    this.selectedBook = null
    this.selectedPage = null
    this.previousSelectedBag = null
    this.thisBag = options.thisBag
    this.bookRef = options.bookRef
    this.navBar = options.thisBag.bagRef.dashRefObj.navBar
  }

  criar(options) {
    this.pages = []
    this.newBook = document.createElement("caderno")
    this.addEstilo(this.newBook, {
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
      paddingLeft: "2%",
      cursor: "pointer"
    })

    this.hover(this.newBook, {
      backgroundColor: "var(--cor-clara)"
    })

    // Editar nome do caderno
    this.newBookName = document.createElement("p")
    this.newBookName.textContent = options.name ? options.name : "Novo Caderno " + ("(" + ++bookCounter + ")")
    this.addRenamable(this.newBookName, 19)
    this.addEstilo(this.newBookName, {
      height: "50%"
    })

    // this.newBookName.ondblclick = () => {
    //   this.addEstilo(this.newBookName, {
    //     transitionTimingFunction: "ease",
    //     textDecoration: "underline white",
    //     cursor: "text"
    //   })
    //   this.newBookName.contentEditable = true
    //   let oldTextContent = this.newBookName.textContent
    //   let range, selection
    //   // Selecionando todo texto dentro da div
    //   if (document.body.createTextRange) {
    //     range = document.body.createTextRange()
    //     range.moveToElementText(this.newBookName)
    //     range.select()
    //   } else if (window.getSelection) {
    //     selection = window.getSelection()
    //     range = document.createRange()
    //     range.selectNodeContents(this.newBookName)
    //     selection.removeAllRanges()
    //     selection.addRange(range)
    //   }
    //   this.newBookName.onkeydown = e => {
    //     if (e.keyCode == 13) {
    //       if (this.newBookName.innerText.trim() == "") {
    //         this.newBookName.textContent = oldTextContent
    //       }
    //       // else {
    //       //   this.bagName = this.newBookName.textContent
    //       // }
    //       this.newBookName.contentEditable = false
    //       this.addEstilo(this.newBookName, {
    //         textDecoration: "none",
    //         cursor: "pointer"
    //       })
    //     }
    //   }
    //   document.onclick = e => {
    //     if (e.target != this.newBookName) {
    //       if (this.newBookName.innerText.trim() == "") {
    //         this.newBookName.textContent = oldTextContent
    //       }
    //       // else {
    //       //   this.bagName = this.newBookName.textContent
    //       // }
    //       this.newBookName.contentEditable = false
    //       this.addEstilo(this.newBookName, {
    //         textDecoration: "none",
    //         cursor: "pointer"
    //       })
    //       document.onclick = () => { }
    //     }
    //   }
    // }

    const bookButtonContainer = document.createElement("div")
    this.addEstilo(bookButtonContainer, {
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
        this.deleteBook(options.containerRef, this.newBook)
      },
      hover: { backgroundColor: "var(--cor-escura)", borderRadius: "50%" }
    })

    this.newBook.onclick = e => {
      if (e.target == this.newBook || e.target == this.newBookName) {
        options.thisBag.selectBook(this)
      }
    }

    this.newBook.onmouseover = () => {
      if (!this.currentBook())
        this.newBook.style.backgroundColor = "var(--cor-clara)"
    }

    this.newBook.onmouseout = () => {
      if (!this.currentBook())
        this.newBook.style.backgroundColor = "var(--cor-escura)"
    }

    this.newBook.append(this.newBookName)
    this.newBook.append(bookButtonContainer)
    options.containerRef.insertBefore(
      this.newBook,
      options.containerRef.lastChild
    )

    let anim = this.newBook.animate(
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
    // let length = options.folhas ? options.folha.length : null
    // if (length > 0) {
    //   this.options.folha.forEach(page => {
    //     newPage(page.exportBlocos)
    //   })
    // }
  }

  load(folhas) {
    folhas.forEach(fol => {
      const { exportBlocos, name, height } = fol
      let folha = this.newPage(name, height)
      folha.load(exportBlocos)
    })
    this.selectedPage = this.pages[this.pages.length - 1]
  }

  export() {
    let folhas = []
    this.pages.forEach(page => {
      folhas.push(page.export())
    })
    console.log("folhas", folhas)
    return { name: this.newBookName.textContent, folhas }
  }

  deleteBook(ref, book) {
    if (confirm("Tem certeza que deseja excluir esse caderno?")) {
      let anim = book.animate(
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
        let bookLength = this.thisBag.cadernos.length
        let bookArray = this.thisBag.cadernos
        if (bookLength > 1) {
          if (this.isSelected) {
            this.thisBag.selectBook(bookArray[bookLength - 2])
          }
        }
        for (let i = 0; i <= bookLength; i++) {
          if (bookArray[i] == this) bookArray.splice(i, 1)
        }
        ref.removeChild(book)
        if (this.thisBag.cadernos.length == 1)
          this.thisBag.selectBook(bookArray[0])
        if (this.thisBag.cadernos.length == 0)
          this.bookRef.emptyBookWarningCreator()
      }
    }
  }

  currentBook() {
    return this.isSelected
  }

  newPage(name, height) {
    this.pageArray = this.thisBag.bagRef.currentBag().currentBook().pages
    this.pageArray.push(
      new Folha({
        folhaContainer: this.navBar.folhaContainer,
        loadedFonts: this.navBar.loadedFonts,
        height
      })
    )
    let tab = this.navBar.createTab(this.pageArray[this.pageArray.length - 1], name)

    this.pageArray[this.pageArray.length - 1].navTab = tab

    this.selectedPage = this.pageArray[this.pageArray.length - 1]

    return this.selectedPage
  }

  esconderFolhas() {
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].esconderBlocos()
    }
  }

  mostrarFolhas() {
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].mostrarBlocos()
    }
  }
}

module.exports = Caderno
