import { Entities } from "../entities/entities.js"
import generateRange from "../utils/generateRange.utils.js"
import block_initial_stats from "./blockInitial_stats.js"

export class Blocks extends Entities { //=> Durability 1-6

    constructor() {
        super()
        this.blocks = {
            ...block_initial_stats
        }
    }

    generateBlock() {

        for (const obj in this.blocks) {

            const block = this.blocks[obj]

            const { frames, hit_box } = this.models["blocks"]

            const { floor, name } = block

            const { min_floor, max_floor } = floor

            const floorRange = generateRange(min_floor, max_floor)

            const array = this.matriz.slice(min_floor, max_floor + 1)

            for (let i = 0; i < array.length; i++) {

                const floor = array[i]

                for (let j = 0; j < floor.length; j++) {

                    this.matriz[floorRange[i]][j] = { type: "block", name: name }

                    this.drawEntity({ dx: j, dy: floorRange[i], hit_box, img: frames[obj][0] })

                }
            }
        }

    }

    generateBlock2() {

        const { frames, hit_box } = this.models["blocks"]

        this.matriz[13][10] = { name: "grass", type: "block" }
        this.matriz[8][2] = { name: "grass", type: "block" }
        this.drawEntity({ dx : 10, dy : 13, hit_box, img: frames["grass"][0] })
        this.drawEntity({ dx : 2, dy : 8, hit_box, img: frames["grass"][0] })
    }



}