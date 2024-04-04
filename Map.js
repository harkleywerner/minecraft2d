
const canvas = document.getElementById("canvans1");
const ctx = canvas.getContext("2d");



export default class Map {
    constructor() {
        this.entityList = {}
        this.width = 1488
        this.heigth = 600
        this.pixel = 24
        this.ctx = ctx
        this.gravity = 5.0
        this.matriz = []
        this.generateMatriz()
    }

    generateMatriz(){

        const pixel = this.pixel

        const heigth = Math.round(this.heigth / pixel)
        const width = Math.round(this.width / pixel)

        this.matriz = Array.from({ length: heigth },
            () => Array.from({ length: width }, () => 0)
        )
    }

}



