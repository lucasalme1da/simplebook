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

  addRenamable(obj, ellipsisStartPoint, bagName) {
    obj.ondblclick = () => {
      if (obj.title.length > 0) obj.textContent = obj.title
      this.addEstilo(obj, {
        transitionTimingFunction: "ease",
        objDecoration: "underline white",
        cursor: "text",
        textOverflow: "unset",
        width: "80%",
        overflow: "hidden"
      })
      obj.contentEditable = true
      let oldTextContent = obj.textContent
      let range, selection
      // Selecionando todo texto dentro da div
      if (document.body.createTextRange) {
        range = document.body.createTextRange()
        range.moveToElementText(obj)
        range.select()
      } else if (window.getSelection) {
        selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(obj)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      document.onclick = e => {
        if (e.target != obj) {
          if (obj.innerText.trim() == "") {
            obj.textContent = oldTextContent
          }
          obj.contentEditable = false
          this.addEstilo(obj, {
            textDecoration: "none",
            cursor: "pointer"
          })
          obj.title = obj.textContent
          if (bagName) {
            if (obj.textContent.length >= ellipsisStartPoint - 5) {
              bagName.bagDashRef.nameRightContainer.textContent = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}...`
              bagName.bagName = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}...`
            } else {
              bagName.bagDashRef.nameRightContainer.textContent = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}`
              bagName.bagName = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}`
            }
          }
          if (obj.textContent.length >= ellipsisStartPoint)
            obj.textContent = `${obj.textContent.slice(
              0,
              ellipsisStartPoint
            )}...`
          document.onclick = () => {}
        }
      }
      obj.onkeydown = e => {
        if (e.keyCode == 13) {
          if (obj.innerText.trim() == "") {
            obj.textContent = oldTextContent
          }
          obj.contentEditable = false
          this.addEstilo(obj, {
            textDecoration: "none",
            cursor: "pointer"
          })
          obj.title = obj.textContent
          if (bagName) {
            if (obj.textContent.length >= ellipsisStartPoint - 5) {
              bagName.bagDashRef.nameRightContainer.textContent = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}...`
              bagName.bagName = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}...`
            } else {
              bagName.bagDashRef.nameRightContainer.textContent = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}`
              bagName.bagName = `${obj.textContent.slice(
                0,
                ellipsisStartPoint - 5
              )}`
            }
          }
          if (obj.textContent.length >= ellipsisStartPoint)
            obj.textContent = `${obj.textContent.slice(
              0,
              ellipsisStartPoint
            )}...`
        }
      }
    }
  }
}

module.exports = Estilo
