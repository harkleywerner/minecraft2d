import Entity from "./EntityMovents.js";

export default class Player extends Entity {

    constructor(map) {
        super(map)
        this.x = 4 * 12
        this.y = 7 * 12
        this.width = 24
        this.heigth = 48
        this.moventSpeed = 20
        this.hit_box = {
            x: 1,
            y: 2
        }
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

            e.preventDefault()
            e.stopPropagation()

            if (e.key == "d") {
                this.entityCheck({ dx: this.moventSpeed })
            } else if (e.key == "a") {
                this.entityCheck({ dx: -this.moventSpeed })
            } else if (e.key == "w") {
                this.entityCheck({ dy: -this.moventSpeed })
            } else if (e.key == "s") {
                this.entityCheck({ dy: this.moventSpeed})
            } else if (e.key == "Escape") {
                this.pause = !this.pause
            } else if (e.key == "Tab") {
                console.log(this)
                console.log(this.map.matriz)
            } else if (e.code == "Space") {
                this.jumpEntity({ dy: -24 * 6 })
            } else if (e.key == "Alt") {
                this.fly = !this.fly
            }
        })
    }

}