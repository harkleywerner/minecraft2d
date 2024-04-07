const canvans = document.getElementById("canvans1");
const ctx = canvans.getContext("2d");

//Los sprites se generaran con la APP de sprite generator.
//Es decir que pasareos lo escencial para que pueda identificar y generar el nueva sprite.

const list = {
    "walkL": {
        row: 10,
        col: 6,
        offsetX: -10,
        offsetY: -5,
        start_col: 1
    },
    "walkR": {
        row: 12,
        col: 6,
        offsetX: -10,
        offsetY: -5,
        start_col: 1
    },
    "idleR": {
        row: 12,
        col: 1,
        offsetX: -10,
        offsetY: -5
    },
    "idleL": {
        row: 10,
        col: 1,
        offsetX: -10,
        offsetY: -5
    },
    "attackR": {
        row: 20,
        col: 13,
        offsetY: -2,
        offsetX: -10,
    }
}


export default class Sprites {
    constructor({ max_col = 18, max_row = 21, animations = list, scale = 0.7, img = "src/images/player.png" } = {}) {
        this.max_col = max_col
        this.max_row = max_row
        this.scale = scale
        this.currentSprite = {
            type: "idleR",
            stage: 0
        }
        this.img = (() => {
            const i = new Image()
            i.src = img
            return i
        })()
        this.animations = animations
    }

    handlerSprite({ type, select_stage }) {

        const compare = this.currentSprite.type !== type
        
        const currentAnimation = this.animations[type]

        if (compare) {
            this.currentSprite = { type, stage: currentAnimation.start_col ?? 0 }
        } else {
            const nextStage = select_stage ?? this.currentSprite.stage + 1
            const nt = nextStage > (currentAnimation.col - 1)
            this.currentSprite.stage = nt ? 0 : nextStage
        }
    }  

    generateNewSprite(){
        //Aca generaria un sprite con respecto al patron definido.
        //Como el generadore de sprite, se hace mediante una URL, podriamos utilizar eso para generar un sprite previmante almacenado
        //Entonces si solamente cambia el arco, se generaria otro sprite interactivo con ese arco.
        //Al sprite se le pasara un objecto que contenga a detalle todo lo que se debe renderizar.
    }

    injectSprite({ dx = 5, dy = 5 }) {


        const spriteWidth = this.img.width / this.max_col
        const spriteHeight = this.img.height / this.max_row

        const sprite = this.currentSprite
        const animation = this.animations[sprite.type]

        if (!animation) return

        const sx = sprite.stage
        const sh = animation.row - 1
        const offsetX = animation.offsetX || 0
        const offsetY = animation.offsetY || 0


        ctx.drawImage(
            this.img,
            sx * spriteWidth, //Indice fila y columna (recorta la imagen)
            sh * spriteHeight,
            spriteWidth, // Ancho y alto individual del la img
            spriteHeight,
            dx + offsetX, //cords
            dy + offsetY,
            spriteWidth * this.scale, //ancho y altura en canvans
            spriteHeight * this.scale
        )

        ctx.strokeStyle = "white"; // Color del borde
        ctx.lineWidth = 2;
        // ctx.strokeRect(dx - 10, dy - 5, spriteWidth * this.scale, spriteHeight * this.scale)
    }

}