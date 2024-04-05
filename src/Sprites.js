const canvans = document.getElementById("canvans1");
const ctx = canvans.getContext("2d");

//En caso de que otros codigos generen cambios en el alto/ancho del canvans
//Se debera pasar dentro del class para que tome el valor mas actual.

class Sprites {
    constructor({ col, row, models = {}, scale, img }) {
        this.width = canvans / col
        this.height = canvans / row
        this.scale = scale
        this.currentSprite = {
            type: "",
            stage: 0
        }
        this.img = (() => {
            const i = new Image()
            return i.src = img
        })()
        this.models = models
    }

    handlerSprite({ type }) {

        const compare = this.currentSprite.type !== type

        const currentModel = this.models[type]

        if (compare) {
            this.currentSprite = currentModel
        } else {
            const nextStage = this.compareSprite.stage + 1
            this.currentSprite.stage = nextStage > currentModel.col ? 0 : nextStage
        }
    }

    injectSprite({ type }) {

        ctx.drawImage(

        )

    }

}