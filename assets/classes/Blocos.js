const Estilo = require("./Estilo")
const Botao = require('./Botao')

class Blocos extends Estilo {

    constructor(options) {
        super()
        this.folhaContainer = options.folhaContainer
        this.tempoOptions;
        this.folha = options.folha
        this.criar()
    }


    makeResize(element, resizers) {
        const minimum_size = 20;
        let originalWidth = 0;
        let originalHeight = 0;
        let originalX = 0;
        let originalY = 0;
        let originalMouseX = 0;
        let originalMouseY = 0;

        const stopResize = resizer => {
            this.addEstilo(this.folhaContainer, {
                cursor: "default"
            })
            this.addEstilo(resizer, {
                cursor: "grab",
                backgroundColor: 'white'
            })
            window.onmousemove = () => { }
        }
        const resize = (e, resizer) => {
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
        resizers.forEach(resizer => {

            resizer.onmousedown = e => {
                e.preventDefault()
                originalWidth = this.parsePx(getComputedStyle(element, null).getPropertyValue('width'))
                originalHeight = this.parsePx(getComputedStyle(element, null).getPropertyValue('height'))
                originalX = this.parsePx(element.style.left);
                originalY = this.parsePx(element.style.top);
                originalMouseX = e.pageX;
                originalMouseY = e.pageY;
                window.onmousemove = ew => {
                    resize(ew, resizer)
                }
                window.onmouseup = () => {
                    stopResize(resizer)
                }
            }


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

            ref.addEstilo(ref.editContainer, {
                display: 'flex',
                opacity: '0'
            })

            ref.editContainer.animate([{

                opacity: '0',
                left: '1vw'

            }, {
                opacity: '1',
                left: '2vw'


            }], {
                    duration: 100,
                    fill: 'forwards'
                })
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

    criar() {

        this.blocoRef = document.createElement('bloco')

        this.optionsContainer = document.createElement('optionsContainer')
        this.addEstilo(this.optionsContainer, {
            position: 'absolute',
            left: '100%',
            paddingLeft: '15px'
        })


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
                backgroundColor: "var(--cor-media)",
                boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            },
            action: () => this.openEditContainer(this)
        })
        this.editContainer = document.createElement('editContainer')
        this.addEstilo(this.editContainer, {

            display: 'none',
            position: 'relative',
            top: '-1vw',
            left: '1.5vw',
            minWidth: '200px',
            minHeight: '100px',
            borderRadius: '8px',
            backgroundColor: 'var(--cor-media)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'


        })

        this.optionsContainer.appendChild(this.editContainer)

        this.blocoRef.appendChild(this.optionsContainer)

        this.addEstilo(this.blocoRef, {
            width: '200px',
            height: '100px',
            border: '1px solid var(--cor-escura)',
            position: 'absolute',
            top: '50px',
            left: '50px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
        })

        this.blocoRef.onmousedown = e => {

            if (e.target == this.blocoRef) {
                let tempo;
                let blocoStyle = this.blocoRef.style
                let bloco = this.blocoRef
                let originalX = this.parsePx(blocoStyle.left)
                let originalY = this.parsePx(blocoStyle.top)

                let get = false
                let mousePosX;
                let mousePosY;
                let left;
                let top;
                this.folhaContainer.onmousemove = e => {
                    if (!get) {
                        mousePosX = e.pageX - this.folhaContainer.offsetLeft
                        mousePosY = e.pageY - this.folhaContainer.offsetTop
                        left = mousePosX - originalX;
                        top = mousePosY - originalY;
                        get = true
                    }
                    mousePosX = e.pageX - this.folhaContainer.offsetLeft
                    mousePosY = e.pageY - this.folhaContainer.offsetTop
                    blocoStyle.left = this.reparsePx(mousePosX - left)
                    blocoStyle.top = this.reparsePx(mousePosY - top)
                }
                this.folhaContainer.onmouseup = () => {

                    this.folhaContainer.onmousemove = () => { }
                    this.addEstilo(this.folhaContainer, {
                        cursor: 'default'
                    })

                }
                this.addEstilo(this.folhaContainer, {
                    cursor: 'grabbing'
                })

            }
        }

        this.resizes = []

        let resizesContainer = []


        this.resizeTopLeft = document.createElement('resize')
        this.resizeTopLeft.topLeft = true
        this.resizes.push(this.resizeTopLeft)
        let reziseContainerTopLeft = document.createElement('reziseContainer')
        this.addEstilo(reziseContainerTopLeft, {
            top: '0%',
            left: '0%',
            position: 'absolute'
        })
        resizesContainer.push(reziseContainerTopLeft)
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
        resizesContainer.push(reziseContainerTop)
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
        resizesContainer.push(reziseContainerTopRight)
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
        resizesContainer.push(reziseContainerLeft)
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
        resizesContainer.push(reziseContainerRight)
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
        resizesContainer.push(reziseContainerBottomLeft)
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
        resizesContainer.push(reziseContainerBottomRight)
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
        resizesContainer.push(reziseContainerBottom)
        reziseContainerBottom.appendChild(this.resizeBottom)


        this.resizes.forEach(resize => {

            let vw = window.innerWidth
            let vh = window.innerHeight

            this.addEstilo(resize, {
                width: '1vw',
                height: '1vw',
                display: 'block',
                borderRadius: '50%',
                border: '1px solid var(--cor-escura)',
                position: 'relative',
                top: '-0.5vw',
                left: '-0.5vw',
                backgroundColor: 'white',
                zIndex: '2',
            })
            this.makeResize(this.blocoRef, this.resizes)
        })

        this.blocoRef.append(...resizesContainer)
        this.folhaContainer.appendChild(this.blocoRef)
    }

}

module.exports = Blocos