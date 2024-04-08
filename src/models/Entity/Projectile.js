import Entity from "./Entity.js";

export default class Projectile extends Entity {
    constructor(map) {
        super(map)
        this.width = 12,
        this.heigth = 12
        this.hit_box = {
            x: 1,
            y: 1
        }
        this.onFreeFall = false
        this.shocked = false
        this.name = "proyectile"
    }


    render() {
        this.freeFall()
    }

    shoot({ dx, dy, id }) {

        if (this.shocked) return

        const check = this.entityCheck({ dx, dy, exclusionary: id })

        if (check && check?.id !== id) {
            this.shocked = true
      
        }
        setTimeout(() => {
            this.removeEntityInMatriz()
            delete this.map.entityList[this.id]
        }, 500);

    }

}