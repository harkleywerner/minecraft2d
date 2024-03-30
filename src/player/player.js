import { Blocks } from "../blocks/blocks.js";


export class Player extends Blocks {
    constructor() {
        super()
        this.keysEvents = new Set();
        this.moveSpeed = 1
    }

    moveToKeyboard() {

        const keyList = {
            d: "run",
            a: "run",
            f: "attack"
        }

        const entity = { name: "player", id: "player:1" }

        const verificationEntity = (key) => {
            const { actions_execution_time, skill_active } = this.entities["player"]["player:1"]

            return actions_execution_time[keyList[key]] >= Date.now() || skill_active
        }


        window.addEventListener("keydown", (e) => {

            
            if(verificationEntity(e.key)) return

            this.entityIdle({ entity, idle: false })

            this.keysEvents.add(e.key)

            this.updateFrame()
        })

        window.addEventListener("keyup", (e) => {
            this.keysEvents.delete(e.key)

            if(verificationEntity(e.key)) return

            this.entityIdle({ entity, idle: true })
            this.updateFrame()
        })
    }

    updateFrame() {
        const frameUpdate = () => {

            const entity = { name: "player", id: "player:1" }

            this.keysEvents.forEach(key => {
                if (key === "d") {
                    this.moveEntity({ entity, dx: this.moveSpeed, action: "run", direction: "rigth" });
                } else if (key === "a") {
                    this.moveEntity({ entity, dx: -this.moveSpeed, action: "run", direction: "left" });
                } else if (key === " ") {
                    // this.jump();
                } else if (key == "f") {
                    this.entityAttack({ action: "attack", entity })
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
    init.generateEntity("player")
    init.generateBlock()
    init.moveToKeyboard()
    init.generateBlock2()
    console.log(init.matriz)

})()
