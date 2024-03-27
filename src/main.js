export class MapGame {
    constructor() {
        this.ctx = document.getElementById("cavans").getContext("2d")
        this.max_width = 1500
        this.max_heigth = 500
        this.pixel = 25
        this.matriz = []
    }

    generateMatriz() {

        const pixel = this.pixel

        const heigth = this.max_heigth / pixel
        const width = this.max_width / pixel

        this.matriz = Array.from({ length: heigth },
            () => Array.from({ length: width }, () => 0)
        )
    }

    updateMatriz({ dx, dy }) {
        
        this.matriz[dx] 
    }

}