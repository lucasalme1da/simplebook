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
        //     action: () => { console.log('action') }
        //     style: { backgroundColor: 'black'}
        // }
    }

    criar(options) {
        this.ref = document.createElement('button')
        const image = document.createElement('img')
        image.setAttribute('src', `./assets/icons/${options.icon}.svg`)
        this.addEstilo(image, {
            width: options.imageWidth || '30px',
            height: options.imageHeight || '30px',
        })
        this.addEstilo(this.ref, {
            width: options.width,
            height: options.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
        })
        this.addEstilo(this.ref, options.style)
        this.ref.appendChild(image)
        this.ref.onclick = options.action
        options.ref.appendChild(this.ref)

    }


}

module.exports = Botao