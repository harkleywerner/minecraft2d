import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }

    trajectoryY({ dy = 0 }) {

        const pixel = this.map.pixel


        const maxEje = Math.abs(Math.floor(dy / pixel))

        for (let eje = 1; eje <= maxEje; eje++) { //

            const colission = this.collisionCheck({ dy: -(eje * pixel) })

            if (colission) {
                return colission || {}
            }

        }
    }

    jumpEntity({ dy = 0 }) {

        if (this.jump) return
        //Pasar la logica de las collisionCheck dentro del bucle, par que en cada salto verifique
        else if (!this.collisionCheck({ dy: 24 }) && !this.fly) return //=> Verifica si no esta cayendo.

        this.jump = true

        let restante = Math.abs(dy)

        const up = Math.abs((dy / 6))

        let perfomance = performance.now()

        const jump = (currentTime = 0) => {

            const elapsedTime = currentTime - perfomance

            if (elapsedTime >= 30) {

                perfomance = currentTime;

                if (restante <= 0) return this.jump = false

                const colission = this.trajectoryY({ dy: restante })

                const a =  colission?.y > this.y + (-up) 

              
                if(a){
                    this.jump = false
                    return this.colissionObject({colission,dy : (-up)})
                }else {
                    this.entityCheck({ dy: -up })
                }

                restante -= up

            }
            requestAnimationFrame(jump)
        }
        jump()
    }

}