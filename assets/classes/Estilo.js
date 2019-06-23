class Estilo {
  constructor() {
    this.canhover = true
    this.active = false
    this.animationTimes = {
      fast: 40,
      medium: 80,
      slow: 180
    }
  }
  getWidth(element) {
    return getComputedStyle(element, null).getPropertyValue("width")
  }
  getHeight(element) {
    return getComputedStyle(element, null).getPropertyValue("height")
  }

  addEstilo(elemento, estilo) {
    Object.assign(elemento.style, estilo)
  }
  parsePx(px) {
    return parseInt(px.substring(0, px.length - 2))
  }

  getWidth(element) {
    return getComputedStyle(element, null).getPropertyValue("width")
  }
  getHeight(element) {
    return getComputedStyle(element, null).getPropertyValue("height")
  }

  addEstilo(elemento, estilo) {
    Object.assign(elemento.style, estilo)
  }
  parsePx(px) {
    return parseInt(px.substring(0, px.length - 2))
  }
  reparsePx(int) {
    return `${int}px`
  }
  hover(elemento, estilo) {
    const estiloAnterior = {}

    Object.assign(estiloAnterior, elemento.style)

    elemento.onmouseover = () => {
      if (this.canhover) {
        this.addEstilo(elemento, estilo)
      }
    }

    elemento.onmouseout = () => {
      if (this.canhover) {
        this.addEstilo(elemento, estiloAnterior)
      }
    }
  }
}

module.exports = Estilo
