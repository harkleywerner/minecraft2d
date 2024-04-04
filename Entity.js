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

    moveEntity() {

        const matriz = this.map.matriz
        const pixel = this.map.pixel

        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = x + Math.floor((this.x) / pixel)
                const newY = y + Math.floor((this.y) / pixel)
                const currentEntity = matriz[newY][newX] || []
                currentEntity.filter(i => i.id !== this.id)
                matriz[newY][newX] = [this]
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

    entityCheck({ dx = 0, dy = 0 } = {}) {

        if (this.pause) return

        this.removeEntity()

        const colission = this.collisionCheck({ dx, dy })

        if (typeof colission === "object") {

            const newX = Math.abs(this.x - colission.x) - (dx == 0 ? 0 : dx > 0 ? this.width : colission.width)
            //Esta logica siempre se aplica al bloque que esta encima de la colision.
            const newY = Math.abs(this.y - colission.y) - (dy == 0 ? 0 : dy > 0 ? this.heigth : colission.heigth)

            if (newY > 0 && dy !== 0) {
                this.y += dy < 0 ? -newY : newY
            }
            else if (newX > 0 && dx !== 0) {
                this.x += dx < 0 ? -newX : newX
            }
        }
        else {
            this.borderColission({ dx, dy })
        }

        this.moveEntity()
    }

    gravityEntity() {

        const limiteY = this.y == this.map.heigth - this.heigth

        if (limiteY) return

        this.entityCheck({ dy: 9.8 })
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

        for (let y = 0; y < this.hit_box.y; y++) { //Verificar aca la hitbox.

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = Math.floor((this.x + dx + (x * currentPixel)) / currentPixel)

                const newY = Math.floor((this.y + dy + (y * currentPixel)) / currentPixel)

                const getMatriz = () => {

                    for (let y = -1; y <= 1; y++) { //IMPORTAR****Checkear luego si se puede hacer solo tomango 6 indices.

                        for (let x = -1; x <= 1; x++) {

                            if (matriz[newY + y]) {

                                const currentMatriz = (matriz[newY + y][newX + x] || []).filter(i => i.id !== this.id)[0]

                                if (colissionCords(currentMatriz)) return currentMatriz
                            }
                        }

                    }
                }

                const colission = getMatriz()
                //bordes X+-
                //border Y+-
                //Objecto +-

                if (colission || newX < 0 || newX > (matriz[0].length - 1) || newY < 0 || newY > (matriz.length - 1)) {
                    return colission || "border"
                }


            }
        }

    }

}

