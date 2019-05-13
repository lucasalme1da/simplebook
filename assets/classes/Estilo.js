class Estilo {

    constructor() {

    }
    addEstilo(elemento, estilo) {
        Object.assign(elemento.style, estilo)
    }

}

module.exports = Estilo