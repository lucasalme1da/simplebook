const Estilo = require('./Estilo')

class Botao extends Estilo {


    constructor(options) {
        super()
        this.criar(options)
        // exemplo de options 
        // {
        //     icon: 'hamburger',
        //     width: '60%',
        //     height: '60%',
        //     ref: buttons,
        //     text: 'texto'
        //     action: () => { console.log('action') }
        //     style: { backgroundColor: 'black'}
        // }
    }

    criar(options) {


        this.ref = document.createElement('button')

        this.addEstilo(this.ref, {
            width: options.width,
            height: options.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
        })
        this.addEstilo(this.ref, options.style)

        if (options.animation) {
            this.ref.onclick = () => {

                this.ref.animate([
                    {
                        transform: 'scale(1)'
                    }, {
                        transform: 'scale(0.8)'
                    }
                ], 50)
                if (options.action) options.action()

            }

        } else {

            this.ref.onclick = options.action
        }

        if (options.text) {
            this.text = document.createElement('p')
            this.text.textContent = options.text
            this.addEstilo(this.text, {
                fontFamily: 'Roboto',
                color: 'white',
                fontSize: '1em',
                userSelect: 'none'
            })
            this.ref.appendChild(this.text)
        }
        if (options.icon) {

            const image = document.createElement('img')
            image.setAttribute('src', `./assets/icons/${options.icon}.svg`)
            image.setAttribute('draggable', 'false')
            this.addEstilo(image, {
                width: options.imageWidth || '30px',
                height: options.imageHeight || '30px',
                userSelect: 'none'
            })

            this.ref.appendChild(image)
        }
        if (options.icon && options.text) {

            this.addEstilo(this.ref, {
                justifyContent: 'space-around',
                alignItems: 'center',
            })
        }



        options.ref.appendChild(this.ref)



    }


}

module.exports = Botao