//Los valores de las matrices se deben tratar con Floor.
//Por que si es un decimal por ejempl
export default class Entity {
    constructor(map) {
        this.map = map
        this.x = 0
        this.y = 0
        this.width = 24
        this.heigth = 24
        this.id = Math.random()
        this.name = "entity"
        this.hit_box = {
            x: 1,
            y: 1
        }
        this.moventSpeed = 6
    }

    generateEntity(entity, x, y) {

        this.x = x || this.x
        this.y = y || this.y

        this.map.entityList[this.id] = entity

        this.entityCheck()
    }


    removeEntity() {

        const matriz = this.map.matriz
        const pixel = this.map.pixel

        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = x + Math.floor((x + this.x) / pixel)
                const newY = y + Math.floor((y + this.y) / pixel)

                const currentEntities = matriz[newY][newX] || []

                const filtrado = currentEntities.filter(i => i.id !== this.id)

                matriz[newY][newX] = filtrado.length > 0 ? filtrado : 0

            }

        }
    }

    moveEntity({ dx = 0, dy = 0 } = 0) {

        const matriz = this.map.matriz
        const pixel = this.map.pixel

        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = x + Math.floor((dx + this.x) / pixel)
                const newY = y + Math.floor((dy + this.y) / pixel)
                const currentEntity = matriz[newY][newX] || []
                currentEntity.filter(i => i.id !== this.id)
                matriz[newY][newX] = [this]
            }

        }
    }


    entityCheck({ dx = 0, dy = 0 } = {}) {

        if (this.pause) return

        const colission = this.collisionCheck({ dx, dy })

        if (colission) {

            const newX = Math.abs(this.x - colission.x) - (dx > 0 ? this.width : colission.width)

            const newY = Math.abs(this.y - colission.y) - (dy > 0 ? this.heigth : colission.heigth )

            if ((this.y + dy) < 0) {
                this.y = 0
            }
            else if ((dx + this.x + this.width) > this.map.width) {
                this.x = this.map.width - this.width
            }
            else if ((dx + this.x) < 0) {
                this.x = 0
            } else if (newX > 0 ) {
                this.x += dx < 0 ? -newX : newX
            } else if (newY > 0) {
                this.y += dy < 0 ? -newY : newY
            }


            return colission
        }
        else {
            this.removeEntity()
            this.moveEntity({ dx, dy })

            const comprobateY = (this.y + dy) > (this.map.heigth - this.heigth)

            if (comprobateY) {
                this.y = this.map.heigth - this.heigth
            } else {
                this.y += dy
            }

            this.x += dx
        }
    }

    gravityEntity() {

        this.entityCheck({ dy: 24 })
    }



    collisionCheck({
        dx = 0,
        dy = 0,
    } = {}) {

        const currentPixel = this.map.pixel

        const matriz = this.map.matriz

        const colissionCords = (element) => {

            if (!element) return

            const { x, y, width, heigth } = element

            const A = (this.x + dx) < x + width && (this.x + dx) + this.width > x
            const B = (this.y + dy) < y + heigth && (this.y + dy) + this.heigth > y

            return A && B
        }

        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = (this.x + dx + (x * currentPixel)) / currentPixel

                const newY = (this.y + dy + (y * currentPixel)) / currentPixel

                const sideX = Math.floor(newX)
                const sideY = Math.floor(newY)

                const obtenerMatriz = () => {

                    for (let y = -1; y <= 1; y++) {

                        for (let x = -1; x <= 1; x++) {

                            if (matriz[sideY + y]) {

                                const currentMatriz = (matriz[sideY + y][sideX + x] || []).filter(i => i.id !== this.id)[0]

                                if (colissionCords(currentMatriz)) return currentMatriz
                            }
                        }

                    }
                }

                const colission = obtenerMatriz()
                const colissionX = this.x + this.width + dx > this.map.width


                if (
                    colissionX
                    || sideX < 0
                    || sideY < 0
                    || sideX > (matriz[0].length - 1)
                    || sideY > (matriz.length - 1)
                    || colission) {
                    return colission || []
                }


            }
        }

    }

}

