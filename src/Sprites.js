const canvans = document.getElementById("canvans1");
const ctx = canvans.getContext("2d");

export default class Sprites {
    constructor({ max_col, max_row, animations, scale = 0.7, img } = {}) {
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

    getFramesSprite({type}){
        return this.animations[type]?.col
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
    }

}