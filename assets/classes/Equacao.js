
const Blocos = require('./Blocos')

class Equacao extends Blocos {

    constructor(options) {
        super(options)
        this.beforeWasKey = false
        this.lastP = null
        this.criarEquacao(options)
    }

    criarEquacao(options) {

        this.container = document.createElement('div')
        this.container.setAttribute('tabindex', '0')
        this.container.onclick = () => {

            this.container.focus()
        }
        this.addEstilo(this.container, {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            border: '1px solid lightgray',
            borderRadius: '8px'

        })
        this.container.onkeydown = e => {
            console.log(e)
            e.preventDefault()
            if (e.code.contains('Key')) {
                let p = document.createElement('p')
                p.textContent = e.key
                this.container.appendChild(p)
            }
        }
        this.addMainContent(this.container)
    }

}

module.exports = Equacao