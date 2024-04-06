const canvans = document.getElementById("canvans1");
const ctx = canvans.getContext("2d");
//definir la compensacion en cada imagen, para que este acorde a la hitbox
//Revisar luego, si la imagen supera al tamaño de la hitbox, para hacer algun algoritmo que se encargue de
//Determinar todo

const list = {
    "walkL": {
        row: 10,
        col: 6,
        offsetX: 0,
        offsetY : -5
    },
    "walkR": {
        row: 12,
        col: 6,
        offsetX: 0,
        offsetY : -5
    },
    "idle": {
        row: 3,
        col: 3,
    }
}


export default class Sprites {
    constructor({ max_col = 18, max_row = 21, animations = list, scale = 0.7, img = "", test }) {
        this.max_col = max_col
        this.max_row = max_row
        this.scale = scale
        this.currentSprite = {
            type: "walkR",
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

        // currentAnimation.offsetX = currentAnimation.offsetX >= 12 ? 12 : currentAnimation.offsetX + 1

        if (compare) {
            this.currentSprite = { type, stage: 0 }
        } else {
            const nextStage = select_stage || this.currentSprite.stage + 1
            const f = nextStage > (currentAnimation.col - 1)
            this.currentSprite.stage = f ? 0 : nextStage
        }
    }
    offsetAnimation() {

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
            dx +offsetX  , //cords
            dy + offsetY,
            spriteWidth * this.scale, //ancho y altura en canvans
            spriteHeight * this.scale
        )

        ctx.strokeStyle = "white"; // Color del borde
        ctx.lineWidth = 2;
        // ctx.strokeRect(dx - 10, dy - 5, spriteWidth * this.scale, spriteHeight * this.scale)
    }

}