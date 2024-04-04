import Entity from "./EntityMovents.js";

export default class Player extends Entity {

    constructor(map) {
        super(map)
        this.x = 4 * 24
        this.y = 24 * 23
        this.width = 24
        this.heigth = 48
        this.moventSpeed = 20 
        this.hit_box = {
            x: 1,
            y: 2
        }
        this.Iscollapse = false
        this.jump = false
        this.id = 0
        this.pause = false
        this.name = "player"
        this.color = "blue"
        this.fly = false
        this.skills = {}
        this.constrols() //=> Auto ejecutable
    }

    constrols() {


        window.addEventListener("keydown", (e) => {

            e.stopPropagation()

            if (e.key == "d") {
                this.entityCheck({ dx: this.moventSpeed })
            } else if (e.key == "a") {
                this.entityCheck({ dx: -this.moventSpeed })
            } else if (e.key == "w") {
                this.entityCheck({ dy: -this.moventSpeed })
            } else if (e.key == "s") {
                this.entityCheck({ dy: this.moventSpeed })
            } else if (e.key == "Escape") {
                this.pause = !this.pause
                console.log(`Pause ${this.pause}`)
            } else if (e.key == "Tab") {
                console.log(this)
                console.log(this.map.matriz)
            } else if (e.code == "Space") {
                this.jumpEntity({ dy: -24 * 10})
            } else if (e.key == "f") {
                this.fly = !this.fly
                console.log(`Fly ${this.fly}`)
            }
        })
    }

}