import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }

    moventX({ dx }) {

        if (this.velocity.vx + dx > this.velocity.max_vx) return

        this.velocity.vx += dx
    }

    jumpEntity({ dy = 0 }) {

        if (this.jump) return
        else if (!this.collisionCheck({ dy: 24 }) && !this.fly) return //=> Verifica si no esta cayendo.

        this.jump = true

        let lastY = 0 //Si el jump sigue y se quedo estancado, esto detectara que se quedo en el mismo ejeY
        //Sirve para en casos en que el floor haga el redondeo y la suma del 9.8 bajo del objecto al que esta colisinando.

        let restante = Math.abs(dy)

        const jump = () => {


            const check = this.entityCheck({ dy: -12 })

            if (restante <= 0 || lastY == this.y || check) return this.jump = false

            lastY = this.y //Teasteas esto

            restante -= 12

            requestAnimationFrame(jump)
        }
        jump()
    }

}