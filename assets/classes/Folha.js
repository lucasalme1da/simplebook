const Estilo = require("./Estilo")
const Blocos = require("./Blocos")

class Folha extends Estilo {

    constructor(options) {
        super()
        this.blocos = options.blocos || []
        this.folhaContainer = options.folhaContainer
        this.criarBloco({
            posX: 20,
            posY: 20
        })
    }

    criarBloco(options) {
        this.blocos.push(new Blocos({
            folhaContainer: this.folhaContainer,
            posX: `${options.posX}px`,
            posY: `${options.posY}px`,
            folha: this
        }))

    }
    removeBloco(bloco) {

        let ind = this.blocos.findIndex(b => b.blocoRef == bloco.blocoRef)
        this.blocos.splice(ind, 1)
        console.log(this.blocos)
    }
}

module.exports = Folha