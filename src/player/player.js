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

            this.keysEvents.forEach(key => {
                if (key === "d") {
                    this.moveEntity({ entity: "male", dx: this.moveSpeed, direction: "rigth" });
                } else if (key === "a") {
                    this.moveEntity({ entity: "male", dx: -this.moveSpeed, direction: "left" });
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
init.generateEntity("male")
init.moveToKeyboard()