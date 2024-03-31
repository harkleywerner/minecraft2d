import { Blocks } from "../blocks/blocks.js";


export class Player extends Blocks {
    constructor() {
        super()
        this.keysEvents = new Set();
        this.moveSpeed = 1
    }

    moveToKeyboard() {

        const keyListColdown = {
            "f": "attack",
        }

        const entity = { name: "player", id: "player:1" }

        window.addEventListener("keydown", (e) => {

            if (this.entityColdown({ entity, action: keyListColdown[e.key] })) {
                return
            }
            else if (this.entities["player"]["player:1"].isGrounded && e.key == "s" && this.entities["player"]["player:1"].god_mode) {
                return this.entityIdle({ entity, idle: true })
            }
            else if (this.entities["player"]["player:1"].isGrounded && e.key == "s") return

            this.entityIdle({ entity, idle: false })
            this.keysEvents.add(e.key)
            this.updateFrame()
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
                    this.entityJump({ action: "jump", entity, dy: -5, })
                } else if (key === "f") {
                    this.entityAttack({ action: "attack", entity })
                } else if (key === "s") {
                    this.moveEntity({ entity, dy: 1, action: "fall" })
                } else if (key === "w") {
                    this.moveEntity({ entity, dy: -1, action: "idle" })
                } else if (key === "p") {
                    this.entityGodMode({ entity })
                }else if(key === "Escape"){
                    init.generateEntity("bat",2 )
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
    init.generateEntity("player",3)
    init.generateEntity("bat",2 )
    init.moveToKeyboard()
    init.generateBlock2()

})()
