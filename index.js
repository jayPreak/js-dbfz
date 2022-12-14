const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const scaledCanvas = {
    width: canvas.width / 1.5,
    height: canvas.height / 1.5
}
const gravity = 0.5

class Sprite {
    constructor({position, imageSrc}) {
        this.position = position
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        if(!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update() {
        this.draw()
    }
}

class Player {
    constructor(position) {
        this.position = position
        this.velocity = {
            x:0,
            y:1,
        }
        this.height = 100
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, 100)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y < canvas.height){
            this.velocity.y += gravity
        } else {
            this.velocity.y=0
        }
    }
}

const player = new Player({
    x: 0,
    y: 0,
})
const player2 = new Player({
    x: 300,
    y: 100,
})

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false
    },
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc : './assets/bg.png',
})


function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.save()
    c.scale(1.5, 1.5)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    c.restore()
    player.update()
    player2.update()

    player.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 5 
    else if (keys.a.pressed) player.velocity.x = -5
    // console.log('go')
    console
}

animate()
window.addEventListener('keydown', (e)=>{
    console.log(e)
    switch (e.key) {
        case 'd':
            keys.d.pressed = true
            // console.log("Right key is pressed.");
            break
        case 'ArrowRight':
            keys.d.pressed = true
            // console.log("Right key is pressed.");
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'ArrowLeft':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -10
            break
        case 'ArrowUp':
            player.velocity.y = -10
            break
    }
})

window.addEventListener('keyup', (e)=>{
    console.log(e)
    switch (e.key) {
        case 'd':
            keys.d.pressed = false
            // console.log("Right key is pressed.");
            break
        case 'ArrowRight':
            keys.d.pressed = false
            // console.log("Right key is pressed.");
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowLeft':
            keys.a.pressed = false
            break 
    }
})

