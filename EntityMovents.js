import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }
    jumpEntity({ dy = 0 }) {

        console.log()
      
        console.log(this.collisionCheck({ dy: 24 }))
        if (this.jump) return
        //Pasar la logica de las collisionCheck dentro del bucle, par que en cada salto verifique
        else if (this.collisionCheck({ dy: -24 })) return //=> Verifica si hay algun objecto arriba
        else if (!this.collisionCheck({ dy: 24 }) && !this.fly) return //=> Verifica si no esta cayendo.

        this.jump = true

        const total = this.y + dy

        let perfomance = performance.now()

        const jump = (currentTime = 0) => {

            const elapsedTime = currentTime - perfomance

            if (elapsedTime >= 30) {

                perfomance = currentTime;

                const check = this.entityCheck({ dy: dy / 6 })

                if (check || this.y <= total) return this.jump = false
            }
            requestAnimationFrame(jump)
        }
        jump()
    }

}