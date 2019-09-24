const Estilo = require("./Estilo")

class Botao extends Estilo {
  constructor(options) {
    super()
    this.criar(options)
    // exemplo de options
    // {
    //     icon: 'hamburger',
    //     width: '60%',
    //     height: '60%',
    //     ref: buttons,
    //     text: 'texto'
    //     action: () => { console.log('action') }
    //     style: { backgroundColor: 'black'}
    // }
  }

  criar(options) {
    this.ref = document.createElement("button")

    this.ref.ondrag = e => e.preventDefault()

    this.addEstilo(this.ref, {
      width: options.width,
      height: options.height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "8px"
    })
    this.addEstilo(this.ref, options.style)

    if (options.animationHover) {
      this.ref.onmouseover = () => {
        let anim = this.ref.animate(
          [
            {
              transform: "scale(1)"
            },
            {
              transform: "scale(0.5)"
            }
          ],
          this.animationTimes.slow
        )
        anim.onfinish = () => {}
      }
      this.ref.onmouseout = () => {}
    }

    if (options.dbaction) this.ref.ondblclick = options.dbaction

    if (options.animation) {
      this.ref.onclick = e => {
        this.ref.animate(
          [
            {
              transform: "scale(1)"
            },
            {
              transform: "scale(0.8)"
            }
          ],
          50
        )
        if (options.action) options.action(e)
      }
    } else {
      this.ref.onclick = options.action
    }

    if (options.text) {
      this.text = document.createElement("p")
      this.text.textContent = options.text
      this.addEstilo(this.text, {
        fontFamily: "Roboto",
        color: "white",
        fontSize: "1em",
        userSelect: "none"
      })
      this.ref.appendChild(this.text)
    }
    if (options.icon) {
      this.image = document.createElement("img")
      this.image.setAttribute("src", `./assets/icons/${options.icon}.svg`)
      this.image.ondrag = e => {
        e.preventDefault()
      }
      this.image.setAttribute("draggable", "false")
      this.addEstilo(this.image, {
        width: options.imageWidth || "30px",
        height: options.imageHeight || "30px",
        animationFillMode: "forwards",
        userSelect: "none"
      })
      this.image.draggable = options.draggable
      this.ref.appendChild(this.image)
    }
    if (options.icon && options.text) {
      this.addEstilo(this.ref, {
        justifyContent: "space-around",
        alignItems: "center"
      })
    }
    if (options.animationFillMode) {
      this.addEstilo(this.ref, {
        animationFillMode: "forwards"
      })
    }

    options.ref.appendChild(this.ref)
  }

  disable(state) {
    if (state) {
      this.ref.disabled = true
      this.addEstilo(this.ref, {
        opacity: 0.6
      })
    } else {
      this.ref.disabled = false
      this.addEstilo(this.ref, {
        opacity: 1.0
      })
    }
  }
}

module.exports = Botao
