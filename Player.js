import Entity from "./EntityMovents.js";

export default class Player extends Entity {

    constructor(map) {
        super(map)
        this.x = 3 * 24
        this.y = 0 * 23
        this.width = this.map.pixel * 1
        this.heigth = this.map.pixel * 2
        this.velocity = {
            vx: 10,
            vy: 2,
            max_vx: 20
        }
        this.hit_box = {
            x: 1,
            y: 2
        }
        this.isCollapse = false
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


        window.addEventListener("keyup", (e) => {
            if (e.key == "d" || e.key == "a") {
                this.velocity.vx = 10
            }
        })

        window.addEventListener("keydown", (e) => {

            e.stopPropagation()

            if (e.key == "d") {

                this.moventX({ dx: 0.5 })

                this.entityCheck({ dx: this.velocity.vx })
            } else if (e.key == "a") {
                this.moventX({ dx: 0.5 })
                this.entityCheck({ dx: -this.velocity.vx })
            } else if (e.key == "w") {
                this.entityCheck({ dy: -this.velocity.vx })
            } else if (e.key == "s") {
                this.entityCheck({ dy: this.velocity.vx })
            } else if (e.key == "Escape") {
                this.pause = !this.pause
                console.log(`Pause ${this.pause}`)
            } else if (e.key == "Tab") {
                console.log(this)
                console.log(this.map.matriz)
            } else if (e.code == "Space") {
                this.jumpEntity({ dy: -24 * 4 })
            } else if (e.key == "f") {
                this.fly = !this.fly
                console.log(`Fly ${this.fly}`)
            }
        })
    }

}