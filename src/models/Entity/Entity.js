"use strict"
//Los valores de las matrices se deben tratar con Floor.
//Por que si es un decimal por ejempl

export default class Entity {
    constructor(map) {
        this.map = map
        this.x = 0
        this.y = 0
        this.width = this.map.pixel * 1
        this.heigth = this.map.pixel * 1
        this.id
        this.name = "entity"
        this.velocity = {
            vx: 12, //=> Tiene que ser divisible % 24, para que pueda encajar en los bloques perfectamente
            vy: 0,
            max_vx: 12
        }
        this.onFreeFall = true
        this.isCollapse = false //Indica si se debe o no colapsar la entidad.
        this.hit_box = {
            x: 1,
            y: 1
        }
    }

    generateEntity(x, y,f) {

        if (this.id) return

        const id = Math.random()

        this.id = id

        this.map.entityList[id] = this

        this.entityCheck({ dx: x, dy: y,exclusionary : f })
    }

    despawnEntity({ entity } = {}) { //Despawnea de todas partes a la entidad.

        const currentEntity = entity || this

        if (currentEntity.stats.health <= 0) {
            const id = currentEntity.id
            delete currentEntity.map.entityList[id]
            currentEntity.removeEntityInMatriz()
        }
    }

    removeEntityInMatriz() { //Cambiar por nombre de matriz

        const matriz = this.map.matriz
        const pixel = this.map.pixel


        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = x + Math.floor((this.x) / pixel)
                const newY = y + Math.floor((this.y) / pixel)

                const matrizY = matriz[newY]

                if (matrizY) {
                    const filtrado = (matrizY[newX] || []).filter(i => i.id !== this.id)
                    matriz[newY][newX] = filtrado.length > 0 ? filtrado : 0
                }
            }

        }
    }

    moveEntityInMatriz() {

        const matriz = this.map.matriz
        const pixel = this.map.pixel

        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = x + Math.floor((this.x) / pixel)
                const newY = y + Math.floor((this.y) / pixel)

                const matrizY = matriz[newY]
                if (matrizY) {
                    const currentEntity = matrizY[newX] || []

                    const isCollapse = this.isCollapse

                    const filtro = !isCollapse ? [] : currentEntity.filter(i => i.id !== this.id && i.isCollapse)

                    matriz[newY][newX] = [this, ...filtro]
                }

            }

        }
    }

    borderColission({ dx, dy }) {
        const colissionX = this.x + this.width + dx
        const colissionY = this.y + this.heigth + dy

        if (this.x + dx < 0) {
            this.x = 0
        } else if (colissionX > this.map.width) {
            this.x = this.map.width - this.width
        } else if (colissionY > this.map.heigth) {
            this.y = this.map.heigth - this.heigth
        } else if (this.y + dy < 0) {
            this.y = 0
        } else {
            this.x += dx
            this.y += dy
        }

    }

    entityCheck({ dx = 0, dy = 0, exclusionary  } = {}) {

        if (this.pause) return

        this.removeEntityInMatriz()

        const colission = this.collisionCheck({ dx, dy })


        if (typeof colission === "object" && exclusionary !== colission?.id) {



            const reamingX = Math.abs(this.x - colission.x)
            const reamingY = Math.abs(this.y - colission.y)

            //Se toma en cuanta el ancho/alto de elemento mas cercano al 0.
            const width = (dx > 0 ? this.width : colission.width)
            const heigth = (dy > 0 ? this.heigth : colission.heigth)

            if (reamingX > 0 && dx !== 0) {
                const newX = Math.abs(reamingX - width)
                this.x += dx > 0 ? newX : -newX
            } else {
                const newY = Math.abs(reamingY - heigth)
                this.y += dy > 0 ? newY : -newY
            }
        }

        else {
            this.borderColission({ dx, dy })
        }

        this.moveEntityInMatriz()

        return colission
    }

    freeFall() {

        const limiteY = this.y == this.map.heigth - this.heigth

        if (limiteY || this.jumping || this.pause || this.fly || !this.onFreeFall) {
            return this.velocity.vy = 0
        }

        const check = this.entityCheck({ dy: this.velocity.vy })

        if (!check) {
            this.velocity.vy += this.map.gravity
        } else if (check) {
            this.velocity.vy = 0
        }
    }

    collisionCheck({
        dx = 0,
        dy = 0,
    } = {}) {

        const currentPixel = this.map.pixel

        const matriz = this.map.matriz

        const isCollapse = this.isCollapse

        const colissionCords = (element) => {

            if (!element) return

            const { x, y, width, heigth } = element


            const A = (this.x + dx) < x + width && (this.x + dx) + this.width > x
            const B = (this.y + dy) < y + heigth && (this.y + dy) + this.heigth > y

            return A && B
        }

        for (let y = 0; y < this.hit_box.y; y++) { //Verificar aca la hitbox.

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = Math.floor((this.x + dx + (x * currentPixel)) / currentPixel)

                const newY = Math.floor((this.y + dy + (y * currentPixel)) / currentPixel)


                const getMatriz = () => {

                    for (let y = -1; y <= 1; y++) {

                        for (let x = -1; x <= 1; x++) {

                            if (matriz[newY + y]) {

                                const currentMatriz = (matriz[newY + y][newX + x] || [])
                                    .filter(i => (isCollapse ? !i.isCollapse : this.id !== i.id))[0]

                                //Solo se da un colapso si el this true y el iterable/s es true.(Se unen en el array)

                                if (colissionCords(currentMatriz)) return currentMatriz
                            }
                        }
                    }
                }

                const colission = getMatriz()

                if (colission || newX < 0 || newX > (matriz[0].length - 1) || newY < 0 || newY > (matriz.length - 1)) {
                    return colission || "border"
                }


            }
        }

    }

}

