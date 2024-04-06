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
            "bottom": { dy: remaining }
        }

        return obj[direction]
    }

    

    attack({ skill = "basic" } = {}) {

        const pixel = this.map.pixel

        const range = 5 //Total pixele que recorre

        const currentSkill = this.skills[skill]

        const damage = currentSkill.damage

        const step = pixel / 2

        let remaining = step

        if (currentSkill.remainingCD > Date.now() || this.attacking) return

        this.attacking = true

        currentSkill.remainingCD = Date.now() + (currentSkill.cooldown * 1000)

        const velocity = (1 / 1) * 1000

        const interval = setInterval(() => {
            this.sprite.handlerSprite({ type: "attackR" }) //Esto tiene que durar igual que al ataque speed / la cantida de columnas.
        }, velocity / 13);

        const loop = () => {

            const direction = this.getDirection({ remaining })
            const check = this.collisionCheck(direction);
            if (remaining > range * pixel || check) {
                this.sprite.handlerSprite({ type: "attackR", select_stage: 0 })
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

            remaining += step
            requestAnimationFrame(loop)
        }

        setTimeout(() => {
            clearInterval(interval)
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