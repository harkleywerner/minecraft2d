
const canvas = document.getElementById("canvans1");
const ctx = canvas.getContext("2d");
// width="1488" height="600"

canvas.width = 1488
canvas.height = 600



export default class Map {
    constructor() {
        this.entityList = {}
        this.width = canvas.width
        this.heigth = canvas.height
        this.pixel = 24
        this.ctx = ctx
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
        //     canvas.width = window.innerWidth
        //     canvas.height = window.innerHeight - 100
        //     this.width = canvas.width
        //     this.heigth = canvas.height
        
        //     this.test()
        // })

        this.test()
    }

}



