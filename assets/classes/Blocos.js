const Estilo = require("./Estilo")
const Botao = require('./Botao')

class Blocos extends Estilo {
    constructor(options) {
        super()
        this.folhaContainer = options.folhaContainer
        this.tempoOptions;
        this.folha = options.folha
        this.alignPadding = 20
        this.minEditContainerWidth = 200
        this.initialHeight = options.initialHeight || 200
        this.initialWidth = options.initialWidth || 200
        this.criar(options)
        this.maximized = false
        this.tempoFadeOut = 8000
        this.exportData = {}
    }

    export() {

        let exportOb = {
            width: this.parsePx(this.blocoRef.style.width),
            height: this.parsePx(this.blocoRef.style.height),
            posX: this.parsePx(this.blocoRef.style.left),
            posY: this.parsePx(this.blocoRef.style.top),
            load: this.exportData,
            type: this.exportData.type
        }
        return exportOb
    }


    handleClick() {

        if (!this.maximized) this.maximize(this)

        clearTimeout(this.tempoMinimize)
        this.tempoMinimize = setTimeout(() => this.minimize(this), this.tempoFadeOut)


    }

    changeContainerPos(ref) {

        if (ref.optionsContainer.style.left == '100%') {
            ref.addEstilo(ref.optionsContainer, {
                left: '0%'
            })

        }
        else if (ref.optionsContainer.style.left == '0%') {
            ref.addEstilo(ref.optionsContainer, {
                left: '100%'
            })

        }

    }

    chageOptionsStyle(ref, option) {

        const hideOptionsContainer = () => {

            ref.addEstilo(ref.optionsContainer, {
                display: 'none',
                opacity: '0'
            })
        }

        const showOptionsContainer = () => {
            ref.addEstilo(ref.optionsContainer, {
                display: 'block'
            })

            let anim = ref.optionsContainer.animate([
                {
                    opacity: '0',
                    transform: 'scale(0.8)'
                }, {
                    opacity: '1',
                    transform: 'scale(1)'
                }
            ], 80)
            anim.onfinish = () => {
                ref.addEstilo(ref.optionsContainer, {
                    opacity: '1'
                })
            }

        }


        if (option == '100%') {

            hideOptionsContainer()

            let botaoWidth = window.innerWidth * 0.03
            let posMove = this.reparsePx(-(botaoWidth + ref.minEditContainerWidth))

            ref.addEstilo(ref.editContainer, {
                left: posMove
            })

            ref.addEstilo(ref.optionsContainer, {
                paddingLeft: '0px'
            })

            ref.optionsButtons.forEach(button => {

                ref.addEstilo(button.ref, {

                    left: '-2.5vw'

                })

            })
            showOptionsContainer()

        } else {

            hideOptionsContainer()
            ref.addEstilo(ref.editContainer, {
                left: '2vw'
            })

            ref.addEstilo(ref.optionsContainer, {
                paddingLeft: '15px'
            })
            ref.optionsButtons.forEach(button => {


                ref.addEstilo(button.ref, {

                    left: '0vw'
                })

            })
            showOptionsContainer()

        }

    }

    checkEnd(ref) {

        let optionsPercent = ref.optionsContainer.style.left
        let posX = ref.parsePx(ref.blocoRef.style.left)
        let blocoWidth = ref.parsePx(ref.blocoRef.style.width)
        let folhaWidth = ref.parsePx(getComputedStyle(ref.folhaContainer, null).getPropertyValue('width'))
        let paddingLeftOptionsContainer = 15
        let editContainerWidth = (folhaWidth * 0.015) + 200
        if ((posX + blocoWidth + paddingLeftOptionsContainer + editContainerWidth) >= folhaWidth && optionsPercent == '100%') {
            ref.changeContainerPos(ref)
            ref.chageOptionsStyle(ref, '100%')
        } else if (posX <= ref.alignPadding && optionsPercent == '0%') {
            ref.changeContainerPos(ref)
            ref.chageOptionsStyle(ref, '0%')
        }

    }

    makeResize(element, resizers) {
        const minimum_size = 20;
        let originalWidth = 0;
        let originalHeight = 0;
        let originalX = 0;
        let originalY = 0;
        let originalMouseX = 0;
        let originalMouseY = 0;
        let ind

        resizers.forEach(resizer => {

            let resize = e => {
                this.addEstilo(resizer, {
                    cursor: "grabbing",
                    backgroundColor: "lightblue"
                })
                this.addEstilo(this.folhaContainer, {
                    cursor: "grabbing"
                })

                if (resizer.bottomRight) {
                    const width = originalWidth + (e.pageX - originalMouseX);
                    const height = originalHeight + (e.pageY - originalMouseY)
                    if (width > minimum_size) {
                        element.style.width = this.reparsePx(width)
                    }
                    if (height > minimum_size) {
                        element.style.height = this.reparsePx(height)
                    }
                }
                else if (resizer.bottomLeft) {
                    const height = originalHeight + (e.pageY - originalMouseY)
                    const width = originalWidth - (e.pageX - originalMouseX)
                    if (height > minimum_size) {
                        element.style.height = this.reparsePx(height)
                    }
                    if (width > minimum_size) {
                        element.style.width = this.reparsePx(width)
                        element.style.left = this.reparsePx(originalX + (e.pageX - originalMouseX))
                    }
                }
                else if (resizer.topRight) {
                    const width = originalWidth + (e.pageX - originalMouseX)
                    const height = originalHeight - (e.pageY - originalMouseY)
                    if (width > minimum_size) {
                        element.style.width = this.reparsePx(width)
                    }
                    if (height > minimum_size) {
                        element.style.height = this.reparsePx(height)
                        element.style.top = this.reparsePx(originalY + (e.pageY - originalMouseY))
                    }
                }
                else if (resizer.topLeft) {
                    const width = originalWidth - (e.pageX - originalMouseX)
                    const height = originalHeight - (e.pageY - originalMouseY)
                    if (width > minimum_size) {
                        element.style.width = this.reparsePx(width)
                        element.style.left = this.reparsePx(originalX + (e.pageX - originalMouseX))
                    }
                    if (height > minimum_size) {
                        element.style.height = this.reparsePx(height)
                        element.style.top = this.reparsePx(originalY + (e.pageY - originalMouseY))
                    }
                }
                else if (resizer.bottom) {
                    const height = originalHeight + (e.pageY - originalMouseY)
                    if (height > minimum_size) {
                        element.style.height = this.reparsePx(height)
                    }
                }
                else if (resizer.top) {
                    const height = originalHeight - (e.pageY - originalMouseY)
                    if (height > minimum_size) {
                        element.style.height = this.reparsePx(height)
                        element.style.top = this.reparsePx(originalY + (e.pageY - originalMouseY))

                    }
                }
                else if (resizer.right) {

                    const width = originalWidth + (e.pageX - originalMouseX)
                    if (width > minimum_size) {
                        element.style.width = this.reparsePx(width)
                    }

                }
                else if (resizer.left) {
                    const width = originalWidth - (e.pageX - originalMouseX)
                    if (width > minimum_size) {
                        element.style.width = this.reparsePx(width)
                        element.style.left = this.reparsePx(originalX + (e.pageX - originalMouseX))
                    }


                }
            }

            let stopResize = () => {
                this.addEstilo(this.folhaContainer, {
                    cursor: "default"
                })
                this.addEstilo(resizer, {
                    cursor: "grab",
                    backgroundColor: 'white'
                })

                this.folhaContainer.removeEventListener('mousemove', resize)
                this.blocoRef.style.transition = 'top 0.1s ease, left 0.1s ease'

            }


            let initResize = e => {
                e.preventDefault()
                originalWidth = this.parsePx(getComputedStyle(element, null).getPropertyValue('width'))
                originalHeight = this.parsePx(getComputedStyle(element, null).getPropertyValue('height'))
                originalX = this.parsePx(element.style.left);
                originalY = this.parsePx(element.style.top);
                originalMouseX = e.pageX;
                originalMouseY = e.pageY;

                this.folhaContainer.addEventListener('mousemove', resize, false)
                window.addEventListener('mouseup', stopResize, false)
                element.style.transition = 'none'
            }

            // initResize = initResize.bind(this)

            resizer.addEventListener('mousedown', initResize, false)

        })


    }

    removeBloco(ref) {

        let anim = ref.blocoRef.animate([{
            opacity: '1',
            transform: 'scale(1)'

        }, {
            opacity: '0',
            transform: 'scale(0.8)'

        }], 200)

        anim.onfinish = () => {
            ref.blocoRef.style.display = 'none'
            ref.folhaContainer.removeChild(ref.blocoRef)
            ref.folha.removeBloco(ref)
            //Remover do array folha
        }

    }

    appearOptions(ref) {
    }

    openEditContainer(ref) {


        if (ref.editContainer.style.display == 'none') {

            let openRight = () => {

                let anim = ref.editContainer.animate([{

                    opacity: '0',
                    left: '1vw'

                }, {
                    opacity: '1',
                    left: '2vw'
                }], {
                        duration: 100,
                    })

                anim.onfinish = () => {
                    ref.addEstilo(ref.editContainer, {
                        opacity: '1',
                        left: '2vw'
                    })
                }
            }

            let openLeft = () => {
                let botaoWidth = window.innerWidth * 0.03
                let posMove = -(botaoWidth + ref.minEditContainerWidth)
                let posMoveInit = posMove + 20
                posMove = ref.reparsePx(posMove)
                posMoveInit = ref.reparsePx(posMoveInit)
                let anim = ref.editContainer.animate([{

                    opacity: '0',
                    left: posMoveInit

                }, {
                    opacity: '1',
                    left: posMove
                }], {
                        duration: 100,
                    })

                anim.onfinish = () => {
                    ref.addEstilo(ref.editContainer, {
                        opacity: '1',
                        left: posMove
                    })
                }




                ref.addEstilo(ref.editContainer, {
                    left: posMove
                })

            }
            ref.addEstilo(ref.editContainer, {
                display: 'flex',
                opacity: '0'
            })


            if (ref.optionsContainer.style.left == '100%') {

                openRight()

            } else {
                openLeft()
            }

        } else {

            let anim = ref.editContainer.animate([{
                opacity: '1',
                transform: 'scale(1)'
            }, {
                opacity: '0',
                transform: 'scale(0.8)'

            }], 100)

            anim.onfinish = () => {

                ref.addEstilo(ref.editContainer, {
                    display: 'none',

                })

            }


        }




    }

    alignRight(ref) {
        let folhaEnd = ref.parsePx(getComputedStyle(ref.folhaContainer, null).getPropertyValue('width')) - ref.alignPadding
        let blocoWidth = ref.parsePx(ref.blocoRef.style.width)
        let posX = ref.reparsePx(folhaEnd - blocoWidth)


        let anim = ref.blocoRef.animate([
            {
                left: ref.blocoRef.style.left
            }, {
                left: posX
            }
        ], {
                duration: 100,
            })

        anim.onfinish = () => {

            ref.addEstilo(ref.blocoRef, {
                left: posX
            })
            ref.checkEnd(ref)
        }

    }

    alignLeft(ref) {

        let folhaInit = ref.reparsePx(ref.alignPadding)

        let anim = ref.blocoRef.animate([
            {
                left: ref.blocoRef.style.left
            }, {
                left: folhaInit
            }
        ], {
                duration: 100,
            })

        anim.onfinish = () => {

            ref.addEstilo(ref.blocoRef, {
                left: folhaInit
            })
            ref.checkEnd(ref)
        }
    }

    alignCenter(ref) {
        let halfFolhaWidth = this.parsePx(getComputedStyle(ref.folhaContainer, null).getPropertyValue('width')) / 2
        let halfBlocoWidth = ref.parsePx(ref.blocoRef.style.width) / 2

        let posX = this.reparsePx(halfFolhaWidth - halfBlocoWidth)

        let anim = ref.blocoRef.animate([
            {
                left: ref.blocoRef.style.left
            }, {
                left: posX
            }
        ], {
                duration: 100,
            })

        anim.onfinish = () => {

            ref.addEstilo(ref.blocoRef, {
                left: posX
            })
        }


    }

    minimize(ref) {

        ref.addEstilo(ref.blocoRef, {
            border: 'none'
        })

        ref.resizesContainer.forEach(container => {

            let anim = container.animate([{
                opacity: '1'

            }, {
                opacity: '0'
            }], 80)

            anim.onfinish = () => {
                ref.addEstilo(container, {
                    display: 'none'
                })

            }

        })

        let anim = ref.optionsContainer.animate([{

            opacity: '1'

        }, {
            opacity: '0'

        }], 80)

        anim.onfinish = () => {
            ref.addEstilo(ref.optionsContainer, {
                display: 'none'
            })
            ref.maximized = false
        }

    }

    maximize(ref) {
        ref.addEstilo(ref.blocoRef, {
            border: '1px solid var(--cor-escura)'
        })
        ref.resizesContainer.forEach(container => {
            ref.addEstilo(container, {
                display: 'block',
            })
            let anim = container.animate([{
                opacity: '0'

            }, {
                opacity: '1'
            }], 80)


        })

        ref.addEstilo(ref.optionsContainer, {
            display: 'block'
        })
        let anim = ref.optionsContainer.animate([{

            opacity: '0'

        }, {
            opacity: '1'

        }], 80)

        ref.maximized = true

    }

    trazerFrente(ref) {
        ref.folha.trazerFrente(ref)
    }

    addMainContent(element) {
        this.blocoRef.appendChild(element)
    }

    addConfig(elements) {
        elements.forEach(element => {

            this.editContainer.prepend(element)
        })
    }

    addTextEdit(options) {
        const { ref, refel, onchangeSizeAction } = options
        ref.configFont = document.createElement("configFont")
        ref.addEstilo(ref.configFont, {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginBottom: "10px"
        })
        ref.fontFamily = document.createElement("select")
        ref.addEstilo(ref.fontFamily, {
            width: "60%",
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            borderBottom: "1px solid white"
        })
        ref.fontFamily.onchange = () => {
            ref.addEstilo(refel, {
                fontFamily: this.fontFamily.value
            })
        }
        //this.waitFontsDefinitions(this, this.fontFamily)
        ref.loadedFonts.fonts.forEach(font => {
            let option = document.createElement("option")
            option.textContent = font
            option.setAttribute("value", font)
            this.addEstilo(option, {
                backgroundColor: "var(--cor-clara)"
            })
            this.fontFamily.appendChild(option)
        })

        ref.addEstilo(refel, {
            fontFamily: ref.fontFamily.value
        })

        ref.fontSize = document.createElement("input")
        ref.addEstilo(ref.fontSize, {
            width: "20%",
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            borderBottom: "1px solid white"
        })
        ref.fontSize.setAttribute("type", "number")
        ref.fontSize.setAttribute("min", "0")
        ref.fontSize.setAttribute("value", "24")

        if (options.onchangeSizeAction) {
            ref.fontSize.onchange = options.onchangeSizeAction
        } else {
            ref.fontSize.onchange = () => {
                ref.addEstilo(refel, {
                    fontSize: ref.reparsePx(ref.fontSize.value)
                })
            }

        }



        ref.addEstilo(refel, {
            fontFamily: ref.fontFamily.value,
            fontSize: ref.reparsePx(ref.fontSize.value)
        })
        ref.configFont.append(ref.fontFamily, ref.fontSize)
    }

    addInsertSymbols(options) {

        //Organizados em objetos contendo uma string com o tipo e um array com os symbolos 
        // symbol: {
        //     type: 'Grega',
        //     list: []
        // }
        this.symbols = options.symbols
        let simbolos = this.symbols.map(symbol => {

            let ps = symbol.list.map(code => {
                let p = document.createElement('p')
                this.addEstilo(p, {
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '30px',
                    height: '30px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'white',
                    marginLeft: '8px',
                    color: 'var(--cor-fundo)',
                    marginBottom: '8px',
                    fontSize: '22px'
                })
                this.hover(p, {
                    backgroundColor: 'var(--cor-escura)'
                })
                p.addEventListener('click', () => {
                    options.ref.appendOnLast(code)
                })
                p.innerHTML = code
                return p
            })

            return {
                type: symbol.type,
                list: ps
            }

        })
        let symbolModalContainer = document.createElement('div')
        this.disableHoldSelectionAndDrag(symbolModalContainer)
        this.addEstilo(symbolModalContainer, {
            position: 'absolute',
            width: '20%',
            minWidth: '150px',
            height: '100%',
            left: '100%',
            top: '72px',
            display: 'none'

        })
        this.symbolModal = document.createElement('div')
        symbolModalContainer.appendChild(this.symbolModal)
        this.addEstilo(this.symbolModal, {
            display: 'none',
            backgroundColor: 'var(--cor-clara)',
            height: '85%',
            width: '100%',
            minWidth: '150px',
            maxHeight: '300px',
            borderRadius: '8px',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: '999',
            position: 'relative',
            left: '-105%'
        })
        const toggleModal = () => {
            if (this.symbolModal.style.display == 'none') {
                this.symbolModalContainer.style.display = 'block'
                this.symbolModal.style.display = 'flex'
                let anim = this.symbolModal.animate([{
                    opacity: '0',
                    left: '-90%'
                }, {
                    opacity: '1',
                    left: '-105%'
                }], this.animationTimes.medium)
            } else {
                let anim = this.symbolModal.animate([{
                    opacity: '1',
                    left: '-105%'
                }, {
                    opacity: '0',
                    left: '-90%'
                }], this.animationTimes.medium)
                anim.onfinish = () => {

                    this.symbolModal.style.display = 'none'
                    this.symbolModalContainer.style.display = 'none'

                }

            }

        }
        let insertContainer = document.createElement('div')
        this.addEstilo(insertContainer, {
            width: '100%',
            height: '32px',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '5px'
        })
        this.insert = new Botao({
            icon: "hideRight",
            width: "32px",
            height: "32px",
            imageWidth: "20px",
            imageHeight: "20px",
            ref: insertContainer,
            animation: true,
            style: {
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "8px",
                backgroundColor: "var(--cor-media)",
                marginRight: '10px'

            },
            action: toggleModal
        })
        let optionsElements = []
        simbolos.forEach(simbol => {
            const { type, list } = simbol
            let option = document.createElement('option')
            option.textContent = type
            this.addEstilo(option, {
                backgroundColor: "var(--cor-clara)",
                fontSize: '20px'
            })
            let container = document.createElement('div')
            this.addEstilo(container, {
                display: 'none',
                width: '100%',
                maxHeight: '90%',
                overflow: 'auto',
                flexWrap: 'wrap',
                fontSize: '1em'

            })
            option.container = container
            optionsElements.push(option)
            container.append(...list)
            this.symbolModal.append(container)
        })
        optionsElements[0].container.style.display = 'flex'
        this.select = document.createElement('select')
        this.addEstilo(this.select, {
            width: "90%",
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            borderBottom: "1px solid white",
            fontSize: '1em',
            marginTop: '10px',
            marginBottom: '15px'
        })
        this.select.onchange = () => {

            optionsElements.forEach(el => {
                el.container.style.display = 'none'
            })
            optionsElements[this.select.selectedIndex].container.style.display = 'flex'
        }
        this.select.append(...optionsElements)
        this.symbolModal.prepend(this.select)
        this.symbolModal.prepend(insertContainer)
        options.ref.cont.appendChild(symbolModalContainer)


        this.insert = new Botao({
            icon: "pi",
            width: "100px",
            height: "80%",
            text: "Símbolos",
            imageWidth: "12px",
            imageHeight: "12px",
            ref: options.ref.buttons,
            style: {
                marginLeft: "10px",
                marginBottom: "5px",
                minHeight: '45px',
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "8px",
                backgroundColor: "var(--cor-media)"
            },
            action: toggleModal
        })

    }

    moveBloco(e) {

        if (e.target == this.blocoRef) {

            let tempo
            let blocoStyle = this.blocoRef.style
            let bloco = this.blocoRef
            let originalX = this.parsePx(blocoStyle.left)
            let originalY = this.parsePx(blocoStyle.top)
            let originalScroll = Math.ceil(this.folhaContainer.parentElement.scrollTop)
            let get = false
            let mousePosX
            let mousePosY
            let mousePosNoScroll
            let left
            let top
            let scrollTop = 0
            let indexAnterior = blocoStyle.zIndex
            blocoStyle.zIndex = this.folha.zIndexBlocoMax
            let moveFloha = e => {
                if (!get) {
                    mousePosX = e.pageX - this.folhaContainer.offsetLeft
                    mousePosY = e.pageY - this.folhaContainer.offsetTop
                    left = mousePosX - originalX;
                    top = mousePosY - originalY;
                    get = true
                }
                scrollTop = Math.floor(this.folhaContainer.parentElement.scrollTop) - originalScroll
                mousePosX = e.pageX - this.folhaContainer.offsetLeft
                mousePosNoScroll = e.pageY - this.folhaContainer.offsetTop
                mousePosY = scrollTop + mousePosNoScroll
                // console.log({
                //     pageX: e.pageX,
                //     pageY: e.pageY,
                //     offsetLeft: this.folhaContainer.offsetLeft,
                //     offsetTop: this.folhaContainer.offsetLeft,
                //     originalX,
                //     originalY,
                //     blocoStyleTop: blocoStyle.top,
                //     scrollTop,
                //     mousePosY: (mousePosY - top)
                // })
                // console.log({
                //     scrollTop,
                //     mousePosNoScroll,
                //     blocoStyleTop: blocoStyle.top,
                //     mousePosY: (mousePosY - top)
                // })
                blocoStyle.left = this.reparsePx(mousePosX - left)
                blocoStyle.top = this.reparsePx(mousePosY - top)
            }

            moveFloha = moveFloha.bind(this)

            let stopMoveFolha = e => {
                this.folhaContainer.removeEventListener('mousemove', moveFloha)
                this.folhaContainer.parentElement.removeEventListener('scroll', moveBlockWheel)
                blocoStyle.zIndex = indexAnterior
                this.addEstilo(this.folhaContainer, {
                    cursor: 'default'
                })
            }

            let moveBlockWheel = e => {
                scrollTop = Math.ceil(this.folhaContainer.parentElement.scrollTop) - originalScroll
                // scrollTop += Math.ceil(e.deltaY)
                console.log('scroll', scrollTop, 'blocoStyle', blocoStyle.top)
                mousePosY = scrollTop + mousePosNoScroll
                blocoStyle.top = this.reparsePx(mousePosY - top)

            }

            stopMoveFolha = stopMoveFolha.bind(this)

            this.folhaContainer.parentElement.addEventListener('scroll', moveBlockWheel, false)

            this.folhaContainer.addEventListener('mousemove', moveFloha, false)

            this.folhaContainer.addEventListener('mouseup', stopMoveFolha, false)

            this.addEstilo(this.folhaContainer, {
                cursor: 'grabbing'
            })
            e.preventDefault()
            e.stopImmediatePropagation()
        }
    }
    criar(options) {

        this.blocoRef = document.createElement('bloco')

        this.blocoRef.onclick = () => {
            this.handleClick()
        }

        this.optionsContainer = document.createElement('optionsContainer')
        this.disableHoldSelectionAndDrag(this.optionsContainer)
        this.addEstilo(this.optionsContainer, {
            position: 'absolute',
            left: '100%',
            paddingLeft: '15px',
            zIndex: '301'
        })

        this.optionsButtons = []

        this.close = new Botao({
            icon: "close",
            width: "2vw",
            height: "2vw",
            imageWidth: "12px",
            imageHeight: "12px",
            animation: true,
            ref: this.optionsContainer,
            style: {
                display: "flex",
                marginBottom: "5px",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "50%",
                position: 'relative',
                backgroundColor: "var(--cor-media)",
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            action: () => this.removeBloco(this)

        })

        this.edit = new Botao({
            icon: "gear",
            width: "2vw",
            height: "2vw",
            imageWidth: "12px",
            imageHeight: "12px",
            ref: this.optionsContainer,
            animation: true,
            style: {
                display: "flex",
                marginBottom: "5px",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: "50%",
                position: 'relative',
                backgroundColor: "var(--cor-media)",
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            action: () => this.openEditContainer(this)
        })

        this.optionsButtons.push(this.close, this.edit)

        this.editContainer = document.createElement('editContainer')
        this.disableHoldSelectionAndDrag(this.editContainer)

        this.addEstilo(this.editContainer, {

            display: 'none',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '5px',
            top: '-1vw',
            left: '1.5vw',
            width: '200px',
            minHeight: '100px',
            borderRadius: '8px',
            zIndex: '301',
            backgroundColor: 'var(--cor-media)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'


        })
        this.Frete = new Botao({
            width: "80%",
            height: "30px",
            text: 'Trazer para frente',
            ref: this.editContainer,
            animation: true,
            style: {
                padding: '5px',
                display: "flex",
                alignItems: "center",
                backgroundColor: "var(--cor-clara)",
                marginBottom: '3px'
            },
            action: () => this.trazerFrente(this)
        })

        this.center = new Botao({
            width: "80%",
            height: "30px",
            text: 'Centralizar',
            ref: this.editContainer,
            animation: true,
            style: {
                padding: '5px',
                display: "flex",
                alignItems: "center",
                backgroundColor: "var(--cor-clara)",
                marginBottom: '3px'
            },
            action: () => this.alignCenter(this)
        })
        this.aliignLeft = new Botao({
            width: "80%",
            height: "30px",
            text: 'Alinhar a esquerda',
            ref: this.editContainer,
            animation: true,
            style: {
                padding: '5px',
                display: "flex",
                alignItems: "center",
                backgroundColor: "var(--cor-clara)",
                marginBottom: '3px'
            },
            action: () => this.alignLeft(this)

        })

        this.aliignRight = new Botao({
            width: "80%",
            height: "30px",
            text: 'Alinhar a direita',
            ref: this.editContainer,
            animation: true,
            style: {
                padding: '5px',
                display: "flex",
                alignItems: "center",
                backgroundColor: "var(--cor-clara)",
                marginBottom: '3px'

            },
            action: () => this.alignRight(this)

        })

        this.optionsContainer.appendChild(this.editContainer)

        this.blocoRef.appendChild(this.optionsContainer)
        this.addEstilo(this.blocoRef, {
            width: this.reparsePx(this.initialWidth),
            height: this.reparsePx(this.initialHeight),
            border: '1px solid var(--cor-escura)',
            opacity: '1',
            transform: 'scale(1)',
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: this.folha.zIndexBlocoMin,
            top: options.posY,
            left: options.posX,
            padding: '20px',
            transition: 'top 0.1s ease, left 0.1s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        })

        this.blocoRef.addEventListener('mousedown', this.moveBloco.bind(this), false)

        this.resizes = []

        this.resizesContainer = []

        this.resizeTopLeft = document.createElement('resize')
        this.resizeTopLeft.topLeft = true
        this.resizes.push(this.resizeTopLeft)
        let reziseContainerTopLeft = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerTopLeft, {
            top: '0%',
            left: '0%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerTopLeft)
        reziseContainerTopLeft.appendChild(this.resizeTopLeft)
        this.resizeTop = document.createElement('resize')
        this.resizes.push(this.resizeTop)
        this.resizeTop.top = true
        let reziseContainerTop = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerTop, {
            top: '0%',
            left: '50%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerTop)
        reziseContainerTop.appendChild(this.resizeTop)
        this.resizeTopRight = document.createElement('resize')
        this.resizeTopRight.topRight = true
        this.resizes.push(this.resizeTopRight)
        let reziseContainerTopRight = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerTopRight, {
            top: '0%',
            left: '100%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerTopRight)
        reziseContainerTopRight.appendChild(this.resizeTopRight)
        this.resizeLeft = document.createElement('resize')
        this.resizes.push(this.resizeLeft)
        this.resizeLeft.left = true
        let reziseContainerLeft = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerLeft, {
            top: '50%',
            left: '0%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerLeft)
        reziseContainerLeft.appendChild(this.resizeLeft)
        this.resizeRight = document.createElement('resize')
        this.resizes.push(this.resizeRight)
        this.resizeRight.right = true
        let reziseContainerRight = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerRight, {
            top: '50%',
            left: '100%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerRight)
        reziseContainerRight.appendChild(this.resizeRight)
        this.resizeBottomLeft = document.createElement('resize')
        this.resizes.push(this.resizeBottomLeft)
        this.resizeBottomLeft.bottomLeft = true
        let reziseContainerBottomLeft = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerBottomLeft, {
            top: '100%',
            left: '0%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerBottomLeft)
        reziseContainerBottomLeft.appendChild(this.resizeBottomLeft)
        this.resizeBottomRight = document.createElement('resize')
        this.resizes.push(this.resizeBottomRight)
        this.resizeBottomRight.bottomRight = true
        let reziseContainerBottomRight = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerBottomRight, {
            top: '100%',
            left: '100%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerBottomRight)
        reziseContainerBottomRight.appendChild(this.resizeBottomRight)
        this.resizeBottom = document.createElement('resize')
        this.resizes.push(this.resizeBottom)
        this.resizeBottom.bottom = true
        let reziseContainerBottom = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerBottom, {
            top: '100%',
            left: '50%',
            position: 'absolute'
        })
        this.resizesContainer.push(reziseContainerBottom)
        reziseContainerBottom.appendChild(this.resizeBottom)
        this.resizes.forEach(resize => {

            let vw = window.innerWidth
            let vh = window.innerHeight

            this.addEstilo(resize, {
                width: '1vw',
                height: '1vw',
                display: 'block',
                borderRadius: '50%',
                position: 'relative',
                top: '-0.5vw',
                left: '-0.5vw',
                backgroundColor: 'white',
                boxShadow: '0 0 1px 0 var(--cor-escura) inset, 0 0 1px 0 var(--cor-escura)',
                zIndex: '2',
            })
            this.makeResize(this.blocoRef, this.resizes)
        })

        this.blocoRef.append(...this.resizesContainer)
        this.folhaContainer.appendChild(this.blocoRef)
        let animBloco = this.blocoRef.animate([{
            opacity: '0',
            transform: 'scale(0.8)'

        }, {
            opacity: '1',
            transform: 'scale(1)'

        }], this.animationTimes.medium)
        animBloco.onfinish = () => this.minimize(this)
    }

}

module.exports = Blocos