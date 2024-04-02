import Entity from "./EntityMovents.js";

export default class Player extends Entity {

    constructor(map) {
        super(map)
        this.x = 3 * 24
        this.y = 2 * 24
        this.width = 24
        this.heigth = 24
        this.moventSpeed = 12 //=> ,>1|Pares|24<
        this.hit_box = {
            x: 1,
            y: 1
        }
        this.jump = false 
        this.id = 0
        this.pause = false
        this.name = "player"
        this.constrols() //=> Auto ejecutable
    }

    constrols() {


        window.addEventListener("keydown", (e) => {
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
            } else if (e.key == "Tab") {
                console.log(this.map.matriz)
            }else if(e.code ==  "Space"){
                this.jumpEntity({dy : -24 * 4})
            }
        })
    }

}