import { MapGame } from "../main.js"
import block_variants from "./block.variants.js"
import generateRange from "../utils/generateRange.utils.js"

export class Blocks extends MapGame { //=> Durability 1-6

    constructor() {
        super()
        this.blocks = {
            ...block_variants
        }
    }

    generateBlock() {

        for (const obj in this.blocks) {

            const block = this.blocks[obj]

            const { floor, src, stats, name } = block

            const { min_floor, max_floor } = floor

            const floorRange = generateRange(min_floor, max_floor)

            const array = this.matriz.slice(min_floor, max_floor + 1)

            for (let i = 0; i < array.length; i++) {

                const floor = array[i]

                for (let j = 0; j < floor.length; j++) {

                    this.matriz[floorRange[i]][j] = { ...stats, health: 100, id: obj, name: name }

                    this.generateLienzoBlock({ src, x: j * this.pixel, y: floorRange[i] * this.pixel })
                }
            }
        }
    }

    generateLienzoBlock({ src, x = 0, y = 0 }) {

        const img = new Image()

        const pixel = this.pixel

        img.src = src

        img.onload = () => {
            this.ctx.drawImage(img, x, y, pixel, pixel)
        }

    }
}