
const Blocos = require('./Blocos')

class Equacao extends Blocos {

    constructor(options) {
        super(options)
        this.lastElement = null
        this.operators = ['/', '*', '-', '+', '=']
        this.potentials = ['ArrowUp', 'ArrowDown']
        this.symbolOptions = {
            ref: this,
            symbols: [
                {
                    type: 'Operadores',
                    list: ['&#8801;', '&#8800;', '&#8780;', '&#8775;', '&#5171;', '&#5176;',
                        '&#8804;', '&#8805;', '&#8733;', '&#8723;', '&#8704;', '&#8707;',
                        '&#8658;', '&#8660;', '&#8725;', '&#8756;',
                        '&#8757;', '&#8743;', '&#8744;', '&#8730;', '&#8741;', '&#8869;',
                        '&#8737;', '&#8710;']

                },
                {
                    type: 'Conjuntos',
                    list: ['&#8469;', '&#8484;', '&#8474;', '&#8477;',
                        '&#8450;', '&#8709;', '&#8898;', '&#8899;',
                        '&#8834;', '&#8836;', '&#8712;', '&#8712;']

                },
                {
                    type: 'Letras Gregas',
                    list: ['&#945;', '&#946;', '&#947;', '&#948;', '&#949;',
                        '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;',
                        '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;',
                        '&#963;', '&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;',
                        '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;',
                        '&#920;', '&#921;', '&#922;', '&#923;', '&#924;', '&#925;', '&#926;',
                        '&#927;', '&#928;', '&#929;', '&#930;', '&#931;', '&#932;', '&#933;',
                        '&#934;', '&#935;', '&#936;', '&#937;']
                },
                {
                    type: 'Constantes',
                    list: ['&#960;', '&#8495;', '&#981;', '&#8734;']

                },

                {
                    type: 'Cálculo',
                    list: ['&#960;', '&#8495;', '&#981;', '&#8734;']

                },



            ]
        }
        this.Size = 32
        this.potentialsSize = 4
        this.lastUp = false
        this.lastDown = false
        this.loadedFonts = options.loadedFonts
        this.criarEquacao(options)
        if (options.load)
            this.load(options.load)
    }
    export() {
        let elements = Array.from(this.container.children).map(el => {

            return {
                tagName: el.tagName,
                content: el.textContent
            }

        })
        this.exportData = {
            type: this.constructor.name,
            html: this.container.innerHTML
        }
        return super.export()

    }

    load(data) {
        this.container.innerHTML = data.html
        this.lastElement = this.container.lastChild
        Array.from(this.container.children).forEach(child => {
            if (child.tagName == 'DIV') {
                this.loadChildrenP(Array.from(child.children))
            } else if (child.tagName == 'P') {
                this.makeElement(child)
            }
        })
    }
    loadChildrenP(array) {

        array.forEach(child => {
            this.makeElement(child)
        })

    }
    makeElement(editableElement) {

        editableElement.backspaceCount = 2
        editableElement.onfocus = () => {
            this.addEstilo(editableElement, {
                padding: '4px',
                border: '1px solid blue'
            })

        }
        editableElement.onblur = () => {
            this.addEstilo(editableElement, {

                padding: '0px',
                border: 'none'

            })

        }
        editableElement.onkeydown = e => {

            if (e.keyCode == 8) {

                if (!editableElement.textContent.length) {
                    if (editableElement.backspaceCount > 2) {
                        this.container.removeChild(editableElement)
                        if (this.container.lastChild.tagName == 'HR')
                            this.container.removeChild(this.container.lastChild)
                        if (this.container.lastChild)
                            this.container.lastChild.focus()
                    } else {
                        editableElement.backspaceCount++
                    }
                }
            }
            else if (e.keyCode == 13) {
                e.preventDefault()
                this.createSpace()
                this.createElement()

            }
            else {
                this.handleOperators(e)
            }

        }
    }
    appendOnLast(symbol) {

        if (this.lastElement) {

            this.lastElement.innerHTML = `${this.lastElement.textContent}${symbol}`
        }
        else {
            this.createElement()
            this.appendOnLast(symbol)
        }

    }
    createSpace() {

        let hr = document.createElement('hr')
        this.addEstilo(hr, {
            width: '100%'
        })
        this.container.appendChild(hr)
    }
    createElement(options) {
        let text = document.createElement('p')
        this.addEstilo(text, {
            textAlign: 'center',
            fontSize: this.reparsePx(this.Size)
        })

        text.canDigit = false

        text.contentEditable = true

        this.makeElement(text)

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

    createPotenciaElement(options) {
        const { focused } = options
        let height = (!options.up ?
            this.reparsePx(this.parsePx(window.getComputedStyle(focused).getPropertyValue('height')) - 10) :
            this.reparsePx(-this.parsePx(window.getComputedStyle(focused).getPropertyValue('height') + 10))
        )
        let size = this.reparsePx(this.Size - this.potentialsSize)
        console.log(size)
        let el = this.createElement({
            style: {
                position: 'relative',
                top: height,
                fontSize: size
            }
        })
        if (options.up) {
            this.addEstilo(el, {
                marginLeft: '3px'
            })
        }
        options.up ? el.up = true : el.down = true
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
                    // backgroundColor: 'black',
                    // height: '1px',
                    borderTop: '1.5px solid black',
                    borderRadius: '30px',
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

                if (!focused.up && !focused.down) {

                    this.createPotenciaElement({ up: true, focused })

                }
            }
            else if (e.key == 'ArrowDown') {

                if (!focused.up && !focused.down) {

                    this.createPotenciaElement({ down: true, focused })

                }

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


    }

    criarEquacao(options) {
        this.cont = document.createElement('div')
        this.addEstilo(this.cont, {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
        })
        this.buttons = document.createElement('div')
        this.disableHoldSelectionAndDrag(this.buttons)
        this.addEstilo(this.buttons, {
            width: '100%',
            height: '60px',
            display: 'flex',
            justifyContent: 'flex-end'
        })
        this.container = document.createElement('div')
        this.container.setAttribute('tabindex', '0')
        this.container.setAttribute('lang', 'pt-br')
        this.container.ondrag = e => e.preventDefault()
        this.addEstilo(this.container, {
            width: '100%',
            height: '98%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            fontFamily: 'Arimo',
            flexFlow: 'wrap',

        })
        this.container.onkeydown = e => {
            if (e.target == this.container)
                this.keyDown(e, this)

        }
        this.addTextEdit({
            ref: this,
            refel: this.container,
            onChangeSizeAction: () => {
                let px = this.reparsePx(this.fontSize.value)
                let pxPotential = this.reparsePx(parseInt(this.fontSize.value) - this.potentialsSize)
                Array.from(this.container.children).forEach(child => {
                    child.up || child.down ? child.style.fontSize = pxPotential : child.style.fontSize = px
                })
            }
        })

        this.cont.append(this.buttons, this.container)
        this.addInsertSymbols(this.symbolOptions)
        this.addConfig([this.configFont])
        this.addMainContent(this.cont)
    }

}

module.exports = Equacao