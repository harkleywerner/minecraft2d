import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }
    jumpEntity({ dy = 0 }) {



        if (this.jump) return
        else if(!this.collisionCheck({ dy: 24 })) return

        this.jump = true

        const total = this.y + dy

        let perfomance = performance.now()

        const jump = (currentTime = 0) => {

            const elapsedTime = currentTime - perfomance

            if (elapsedTime >= 70) {

                perfomance = currentTime;

                const check = this.entityCheck({ dy: dy / 2 })

                if (check || this.y <= total) return this.jump = false
            }
            requestAnimationFrame(jump)
        }
        jump()
    }

}