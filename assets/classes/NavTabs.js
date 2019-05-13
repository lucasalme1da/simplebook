const Estilo = require('./Estilo')
const Botao = require('./Botao')
class NavTabs extends Estilo {

    constructor(options) {
        super()
        this.criar(options)
    }
    criar(options) {
        this.ref = document.createElement('navtab')
        this.text = document.createElement('p')
        this.text.textContent = options.text
        this.addEstilo(this.text, {
            color: 'white',
            fontSize: '1.1em',
            fontWeight: 'bold',
        })
        this.addEstilo(this.ref, {
            width: '150px',
            height: '35%',
            display: 'flex',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
            alignItems: 'center',
            flexShrink: 3,
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: 'var(--cor-media)',
        })
        this.hover(this.ref, {
            cursor: 'pointer',
            backgroundColor: 'var(--cor-clara)'

        })
        this.ref.onclick = () => {
            this.setActive(options.tabs)

        }
        this.ref.appendChild(this.text)
        this.close = new Botao({
            icon: 'close',
            width: '30px',
            height: '30px',
            imageWidth: '12px',
            imageHeight: '12px',
            ref: this.ref,
            action: () => {
                options.ref.removeChild(this.ref)
                console.log('action')
            },
            style: {
                borderRadius: '50%',

            }
        })
        options.ref.appendChild(this.ref)
    }
    setActive(tabs) {
        tabs.forEach(tab => {
            tab.removeActive()
        })

        this.action()
    }
    removeActive() {
        this.canhover = true
        this.addEstilo(this.ref, {
            backgroundColor: 'var(--cor-media)'
        })

    }
    action() {
        this.canhover = false
        this.addEstilo(this.ref, {
            backgroundColor: 'var(--cor-clara)'

        })
    }
}

module.exports = NavTabs