
export default class Entity {
    constructor(map) {
        this.map = map
        this.x = 0
        this.y = 0
        this.width = 24
        this.heigth = 24
        this.id = Math.random() * 200
        this.name = "entity"
        this.hit_box = {
            x: 1,
            y: 1
        }
        this.fallin = false
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

    moveEntity({ dx, dy }) {

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

        if(this.pause) return

        const colission = this.collisionCheck({ dx, dy })
        if (colission) {
            return colission
        }
        else {
            this.removeEntity()
            this.moveEntity({ dx, dy })
            this.y += dy
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

        const validationFourSides = ({ newX, newY }) => {

            const coords = [ // 0 => redondeo minimo, 1 => redondeo maximo
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ]

            for (const i of coords) {

                const { x, y } = i

                const sideX = x == 0 ? Math.floor(newX) : Math.ceil(newX)
                const sideY = y == 0 ? Math.floor(newY) : Math.ceil(newY)

                const testX = x == 0 ? Math.floor(newX - 0.5) : Math.ceil(newX - 0.5)
                // const testY = y == 0 ? Math.floor(newY - 0.5) : Math.ceil(newY - 0.5)

                if (sideX < 0 || sideY < 0 || sideX > (matriz[0].length - 1) || sideY > (matriz.length - 1)) {
                    return []
                }

                const matrizY = matriz[sideY] || []

                const filtrado = (matrizY[sideX] || []).filter(i => i.id !== this.id)

                const filtrado2 = (matrizY[testX] || []).filter(i => i.id !== this.id)


                const n1 = (filtrado[0]?.x) % 24 === 0 && filtrado.length > 0

                const n2 = (filtrado2[0]?.x || 24) % 24 !== 0 && filtrado2.length > 0

                if (n1 || n2) {
                    return n1 ? filtrado : filtrado2
                }
            }

        }

        const validationsNegatives = (input) => 1 / input === -Infinity

        for (let y = 0; y < this.hit_box.y; y++) {

            for (let x = 0; x < this.hit_box.x; x++) {

                const newX = (this.x + dx + (x * currentPixel)) / currentPixel

                const newY = (this.y + dy + (y * currentPixel)) / currentPixel

                const side = validationFourSides({ newX, newY })

                if (side || validationsNegatives(newX) || validationsNegatives(newY)) {
                    return {
                        object_colission: side
                    }
                }



            }
        }

    }

}

