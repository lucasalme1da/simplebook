const Estilo = require('./Estilo')

class NavTabs extends Estilo {

    constructor(options) {
        super()
        this.criar(options)
    }

    criar(options) {
        this.ref = document.createElement('navtab')
        this.text = document.createElement('p')
        this.text.textContent = options.text
        this.addEstilo(this.ref, {
            width: '10%',
            height: '80%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '10px',
            backgroundColor: 'var(--cor-media)',
        })
        this.ref.onclick = () => this.action
        this.ref.appendChild(this.text)
        options.ref.appendChild(this.ref)

    }

    action() {
        this.addEstilo(this.ref, {
            backgroundColor: 'var(--cor-clara)'

        })

    }
}

module.exports = NavTabs