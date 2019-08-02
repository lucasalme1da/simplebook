
const Blocos = require('./Blocos')

class Equacao extends Blocos {

    constructor(options) {
        super(options)
        this.lastElement = null
        this.operators = ['/', '*', '-', '+', '=']
        this.potentials = ['ArrowUp', 'ArrowDown']
        this.fontSize = 32
        this.lastUp = false
        this.lastDown = false
        this.loadedFonts = options.loadedFonts
        this.criarEquacao(options)
    }

    appendOnLast(symbol) {

        this.lastElement.innerHTML = `${this.lastElement.textContent}${symbol}`

    }

    createElement(options) {
        let text = document.createElement('p')
        this.addEstilo(text, {
            textAlign: 'center'
        })
        text.backspaceCount = 2
        text.onfocus = () => {
            this.addEstilo(text, {
                padding: '4px',
                border: '1px solid blue'
            })

        }
        text.onblur = () => {
            this.addEstilo(text, {

                padding: '0px',
                border: 'none'

            })

        }

        text.canDigit = false

        text.onkeydown = e => {

            if (e.keyCode == 8) {
                if (!text.textContent.length) {
                    if (text.backspaceCount > 2) {
                        this.container.removeChild(text)
                        this.container.lastChild.focus()
                    } else {
                        text.backspaceCount++
                    }
                }
            } else {
                this.handleOperators(e)
            }

        }
        text.contentEditable = true
        this.lastElement = text
        if (options) {
            if (options.symbol) text.innerHTML = options.symbol
            if (options.style) this.addEstilo(text, options.style)
            if (options.append) {
                this.container.appendChild(options.append)
                return this.lastElement
            }
        }

        this.container.appendChild(text)
        text.focus()

        return this.lastElement
    }

    handleOperators(e) {
        if (this.operators.find(operator => operator.includes(e.key))) {
            e.preventDefault()
            if (e.key.includes('/')) {
                let box = document.createElement('div')
                box.onblur = () => {
                    if (!box.children.length) {
                        this.container.removeChild(box)
                    }
                }
                let numerador = this.container.removeChild(this.container.lastChild)
                let divisor = document.createElement('div')
                this.addEstilo(divisor, {
                    backgroundColor: 'black',
                    height: '1px',
                    width: '100%',
                    marginBottom: '3px',
                    marginTop: '3px'
                })
                let denominador = this.createElement({ append: box })
                box.append(numerador, divisor, denominador)
                this.container.appendChild(box)
                denominador.focus()
                return
            }
            else if (e.key.includes('*')) {
                this.createElement({
                    symbol: '&#183;',
                    style: {
                        marginLeft: '10px',
                        marginRight: '10px'
                    }
                })
                this.createElement()
            } else {

                this.createElement({
                    symbol: e.key,
                    style: {
                        marginLeft: '10px',
                        marginRight: '10px'
                    }
                })

                this.createElement()

                // text.focus()
                // setTimeout(() => console.log(this.lastElement, this.lastElement.textContent), 1)
                // setTimeout(() => this.lastElement.textContent = '', 1)

            }
            return
        }
        else if (this.potentials.find(operator => operator.includes(e.key)) && e.ctrlKey) {
            e.preventDefault()
            let focused = e.target
            if (e.key == 'ArrowUp') {
            }
            else if (e.key == 'ArrowDown') {

            }
        }
    }

    keyDown(e, ref) {
        if (!this.lastElement) {

            if (e.code.includes('Key') || e.code.includes('Digit')) {

                this.createElement()
            }

        } else {
            this.lastElement.focus()
        }
        // else {

        //     this.handleOperators(e)
        // }


    }

    criarEquacao(options) {

        this.container = document.createElement('div')
        this.container.setAttribute('tabindex', '0')
        this.container.setAttribute('lang', 'pt-br')
        let font = this.reparsePx(this.fontSize)
        this.addEstilo(this.container, {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            border: '1px solid lightgray',
            borderRadius: '8px',
            fontSize: font,
            fontFamily: 'Arimo',
            flexFlow: 'wrap',
            padding: '10px'

        })
        this.container.onkeydown = e => {
            if (e.target == this.container)
                this.keyDown(e, this)

        }
        this.addTextEdit(this, this.container)
        this.addMainContent(this.container)
    }

}

module.exports = Equacao