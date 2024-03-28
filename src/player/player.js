import { Entities } from "../entities/entities.js"


export class Player extends Entities {
    constructor() {
        super()
        this.keysEvents = new Set();
        this.moveSpeed = 1
    }


    moveToKeyboard() {

        window.addEventListener("keydown", (e) => {
            this.keysEvents.add(e.key)
            this.updateFrame()


        })

        window.addEventListener("keyup", (e) => {
            this.keysEvents.delete(e.key)
            this.updateFrame()
        })
    }

    updateFrame() {
        const frameUpdate = () => {

            const entity = { name: "player", id: "player:1" }

            this.keysEvents.forEach(key => {
                if (key === "d") {
                    this.moveEntity({ entity, dx: this.moveSpeed, action: "run" });
                } else if (key === "a") {
                    this.moveEntity({ entity, dx: -this.moveSpeed, action: "run" });
                } else if (key === " ") {
                    // this.jump();
                }
            });

        };

        frameUpdate();
    }
}

const init = new Player()

init.generateMatriz()
init.generateBlock()
init.generateEntity("player")
init.moveToKeyboard()