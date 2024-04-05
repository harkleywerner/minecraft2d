import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }

    getDirection({ remaining = 0 }) {

        const direction = this.direction

        const obj = {
            "left": { dx: -remaining },
            "rigth": { dx: remaining },
            "top": { dy: -remaining },
            "buttom": { dy: remaining }
        }

        return obj[direction]
    }



    attack({ skill = "basic" } = {}) {

        const pixel = this.map.pixel

        const range = 2

        const currentSkill = this.skills[skill]

        const damage = currentSkill.damage

        let remaining = pixel / 2 
        //Hacer con la mitad del bloque a cada iteracion, sirve para que no se saltee ningun elemento

        const maxTime = currentSkill.remainingCD + (currentSkill.cooldown * 1000)

        if (maxTime > Date.now()) return

        const velocity = (1 / currentSkill.vel) * 1000

        const loop = () => {

            const direction = this.getDirection({ remaining })

            const check = this.collisionCheck(direction);

            if (remaining > range * pixel || check) {

                this.attacking = false

                if (typeof check == "object") {
                    check.color = "red"
                    check.stats.health -= damage
                    this.despawnEntity({ entity: check })
                    setTimeout(() => {
                        check.color = "yellow"
                    }, velocity);
                }

                return
            }

            remaining += 12

            requestAnimationFrame(loop)
        }

        setTimeout(() => {
            this.attacking = true
            currentSkill.remainingCD = Date.now()
            loop()
        }, velocity);



    }

    jump({ dy = 0 }) {


        //Este codigo puede presentar bugs.
        //-Puede que sobrepase a algun objecto cuando salte

        if (this.jumping) return
        else if (!this.collisionCheck({ dy: 24 }) && !this.fly) return //=> Verifica si no esta cayendo.

        this.jumping = true

        let lastY = 0 //Si el jump sigue y se quedo estancado, esto detectara que se quedo en el mismo ejeY

        let restante = Math.abs(dy)

        const loop = () => {
            const check = this.entityCheck({ dy: (dy / 5) })
            if (restante <= 0 || lastY == this.y || check) return this.jumping = false

            lastY = this.y

            restante += (dy / 5)

            requestAnimationFrame(loop)
        }
        loop()


    }

}