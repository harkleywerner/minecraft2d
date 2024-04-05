const canvans = document.getElementById("canvans1");
const ctx = canvans.getContext("2d");

//En caso de que otros codigos generen cambios en el alto/ancho del canvans
//Se debera pasar dentro del class para que tome el valor mas actual.

class Sprites {
    constructor(col, row, models) {
        this.width = canvans / col
        this.height = canvans / row
        this.currentSprite = {
            type: "",
            col: 0
        }
        this.models = models
    }

    injectSprit({ type }) {

    }

}