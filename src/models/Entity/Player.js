import SpritesProcedural from "../../SpritesProcedural.js";
import EntityActions from "./EntityActions.js";


export default class Player extends EntityActions {

    constructor(map) {
        super(map)
        this.x = 0 * 24
        this.y = 500 * 24
        this.width = this.map.pixel * 2
        this.heigth = this.map.pixel * 3
        this.velocity = {
            vx: 12,
            vy: 0,
        }
        this.hit_box = {
            x: 2,
            y: 3
        }
        this.attacking = false
        this.stats = {
            health: 100,
            level: 0,
        }
        this.equipament = {
            hand: {
                type: "weapon",
                name: "ligth_bow",
                vel: 1.2,
                damage: 10,
                size: 1,
                range: 10,
                durability: 100,
            } //=> va el objecto completo del equipamento, con todas sus caractericas etc.
        }
        this.skills = {
            basic: {
                cooldown: 0.5,
                remainingCD: 0,
                damage: 25,
            }
        }
        this.isCollapse = false
        this.pause = false
        this.name = "player"
        this.color = "blue"
        this.fly = false
        this.constrols() //=> Auto ejecutable
        this.sprite = new SpritesProcedural()
    }

    render() {
        this.freeFall()
    }

    constrols() {

        // this.map.canvans.addEventListener("mousemove", (e) => { //esto se debera pasar parte de formato globa.

        //     const pixel = this.map.pixel

        //     const canvasRect = this.map.canvans.getBoundingClientRect();
        //     const clientX = Math.floor((e.clientX - canvasRect.left) / pixel)
        //     const clientY = Math.floor((e.clientY - canvasRect.top) / pixel)
        // })

        window.addEventListener("keyup", (e) => {

            // this.sprite.handlerSprite({ type: this.direction == "rigth" ? "idleR" : "idleL" })
        })



        window.addEventListener("keydown", (e) => {
            if(this.attacking) return
            e.stopPropagation()

            if (e.key == "d") {
                this.direction = "rigth"
                this.sprite.handlerSprite({ type: "walkR" })
                this.entityCheck({ dx: this.velocity.vx })
            } else if (e.key == "a") {
                this.direction = "left"
                this.sprite.handlerSprite({ type: "walkL" })
                this.entityCheck({ dx: -this.velocity.vx })
            } else if (e.key == "w") {
                this.direction = "top"
                this.entityCheck({ dy: -this.velocity.vx })
            } else if (e.key == "s") {
                this.direction = "bottom"
                this.entityCheck({ dy: this.velocity.vx })
            } else if (e.key == "Escape") {
            } else if (e.key == "Tab") {
                console.log(this)
                console.log(this.map.matriz)
            } else if (e.code == "Space") {
                const fly = this.fly ? 1 : 4
                this.jump({ dy: -24 * fly })
            } else if (e.key == "f") {
                this.velocity.vy = 0
                this.fly = !this.fly
                this.jump({ dy: -24 * 3 })
                console.log(`Fly ${this.fly}`)
            } else if (e.key == "1") {
                this.attack()
            }
        })
    }

}