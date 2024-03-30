import { Blocks } from "../blocks/blocks.js";


export class Player extends Blocks {
    constructor() {
        super()
        this.keysEvents = new Set();
        this.moveSpeed = 1
    }

    moveToKeyboard() {

        const keyListColdown = {
            "f" : "attack",
        }

        const entity = { name: "player", id: "player:1" }

        window.addEventListener("keydown", (e) => {

            // console.log(this.entities["player"]["player:1"].position.x)

            if(this.entityColdown({entity,action : keyListColdown[e.key]})){
                return
            }

            this.keysEvents.add(e.key)
            this.updateFrame()
            this.entityIdle({ entity, idle: false })

        })

        window.addEventListener("keyup", (e) => {

            this.keysEvents.delete(e.key)
            this.entityIdle({ entity, idle: true })
            this.updateFrame()
        })
    }

    updateFrame() {
        const frameUpdate = () => {

            const entity = { name: "player", id: "player:1" }

            this.keysEvents.forEach(key => {
                if (key === "d") {
                    this.entityRun({ entity, dx: this.moveSpeed, direction: "rigth" })
                } else if (key === "a") {
                    this.entityRun({ entity, dx: -this.moveSpeed, direction: "left" })
                } else if (key === " ") {
                    this.entityJump({ action: "jump", entity, dy: -2 })
                } else if (key === "f") {
                    this.entityAttack({ action: "attack", entity })
                } else if (key === "s") {
                    this.moveEntity({ entity, dy: 1, action: "fall" })
                }
            });

        };

        frameUpdate();
    }
}

const init = new Player();
(async () => {
    await init.loadAllImg()
    init.generateMatriz()
    init.generateBlock()
    init.generateEntity("player")
    init.moveToKeyboard()
    init.generateBlock2()
})()
