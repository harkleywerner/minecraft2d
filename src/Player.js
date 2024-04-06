import Entity from "./EntityMovents.js";
import Sprites from "./Sprites.js";


export default class Player extends Entity {

    constructor(map) {
        super(map)
        this.x = 0 * 24
        this.y = 0 * 24
        this.width = this.map.pixel * 3
        this.heigth = this.map.pixel * 3
        this.velocity = {
            vx: 12,
            vy: 0,
        }
        this.hit_box = {
            x: 3,
            y: 3
        }
        this.stats = {
            health: 100,
            level: 0,
        }
        this.equipament = {
            hand: "sword" //=> Range,vel.ataque
        }
        this.skills = {
            basic: {
                cooldown: 0.5,
                remainingCD: 0,
                vel: 2, //Esto va ir en las armas nomas, en las habilidades solo damage,cd,rcd
                damage: 25,
            }
        }
        this.test = {
            x: 0,
            y: 0
        }
        this.onFreeFall = true
        this.jumping = false
        this.isCollapse = false
        this.id = 0
        this.pause = false
        this.name = "player"
        this.color = "blue"
        this.fly = false
        this.constrols() //=> Auto ejecutable
        this.sprite = new Sprites({ img: "src/images/player.png", test: this })
    }

    constrols() {


        this.map.canvans.addEventListener("mousemove", (e) => {

            const pixel = this.map.pixel

            const canvasRect = this.map.canvans.getBoundingClientRect();
            const clientX = e.clientX - canvasRect.left
            const clientY = e.clientY - canvasRect.top

            this.test.x = clientX
            this.test.y = clientY
        })

        window.addEventListener("keydown", (e) => {
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
                this.onFreefall = !this.onFreefall
                console.log(`Pause ${this.onFreefall}`)
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
               setInterval(() => {
                this.sprite.handlerSprite({ type: "attackR" }) //Esto tiene que durar igual que al ataque speed.
               }, 150);
                this.attack()
            }
        })
    }

}