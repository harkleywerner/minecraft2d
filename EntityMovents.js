import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }

    jumpEntity({ dy = 0 }) {

        if (this.jump) return
        else if (!this.collisionCheck({ dy: 24 }) && !this.fly) return //=> Verifica si no esta cayendo.

        this.jump = true

        const gravity = this.map.gravity

        let lastY = 0 //Si el jump sigue y se quedo estancado, esto detectara que se quedo en el mismo ejeY
        //Sirve para en casos en que el floor haga el redondeo y la suma del 9.8 bajo del objecto al que esta colisinando.

        let restante = Math.abs(905)

        let perfomance = performance.now()

        const jump = (currentTime = 0) => {

            const elapsedTime = currentTime - perfomance

            if (elapsedTime >= 30) {

                perfomance = currentTime;

               const check =  this.entityCheck({ dy: -gravity})
               console.log(check,lastY)

                if (restante <= 0 || lastY == this.y || check) return this.jump = false

                lastY = this.y

                restante -= gravity

            }
            requestAnimationFrame(jump)
        }
        jump()
    }

}