import Entity from "./Entity.js";

export default class EntityMovents extends Entity {
    constructor(map) {
        super(map)
    }

    moventX({ dx }) {

        if (this.velocity.vx + dx > this.velocity.max_vx) return

        this.velocity.vx += dx
    }

    getDirection({ remaining = 0 }) {

        const direction = this.direction


        if (direction == "left") {
            return { dx: -remaining }
        } else if (direction == "rigth") {
            return { dx: remaining }
        } else if (direction == "top") {
            return { dy: -remaining }
        } else {
            return { dy: remaining }
        }
    }



    attack({ skill = "basic" } = {}) {

        //=> Range le pega hasta donde esta el mob, no importa si otro se interpone, ya que ataca de a varios.
        //

        const pixel = this.map.pixel

        const range = 2

        const currentSkill = this.skills[skill]

        const damage = currentSkill.damage

        let remaining = 12

    
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