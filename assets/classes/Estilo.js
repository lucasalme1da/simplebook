class Estilo {

    constructor() {
        this.canhover = true
        this.active = false
    }
    addEstilo(elemento, estilo) {
        Object.assign(elemento.style, estilo)
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