
const canvans = document.getElementById("canvans1");
const ctx = canvans.getContext("2d");
// width="1488" height="600"

canvans.width = 1488
canvans.height = 600



export default class Map {
    constructor() {
        this.entityList = {}
        this.width = canvans.width
        this.heigth = canvans.height
        this.pixel = 24
        this.ctx = ctx
        this.canvans = canvans
        this.gravity = 0.20
        this.matriz = []
        this.generateMatriz()
    }


    test(){
        const pixel = this.pixel

        const heigth = Math.round(this.heigth / pixel)
        const width = Math.round(this.width / pixel)

        this.matriz = Array.from({ length: heigth },
            () => Array.from({ length: width }, () => 0)
        )
    }

    generateMatriz() {

        // window.addEventListener("resize", () => {
        //     canvans.width = window.innerWidth
        //     canvans.height = window.innerHeight - 100
        //     this.width = canvans.width
        //     this.heigth = canvans.height
        
        //     this.test()
        // })

        this.test()
    }

}



