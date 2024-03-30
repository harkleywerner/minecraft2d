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

    drawBlock({ name, dx, dy }) {

        const { frames, hit_box } = this.models["blocks"]

        const block = frames[name]

        const ctx = this.ctx

        const img = block[0]

        ctx.drawImage(img, dx * this.pixel, dy * this.pixel, hit_box.width, hit_box.height);
    }

    generateBlock() {

        for (const obj in this.blocks) {

            const block = this.blocks[obj]

            const { floor, name } = block

            const { min_floor, max_floor } = floor

            const floorRange = generateRange(min_floor, max_floor)

            const array = this.matriz.slice(min_floor, max_floor + 1)

            for (let y = 0; y < array.length; y++) {

                const floor = array[y]

                for (let x = 0; x < floor.length; x++) {

                  
                    if((x !== 4) && (floorRange[y] !== 15) && x !== 3 ){
                    this.matriz[floorRange[y]][x] = { type: "block", name: name }
                    
                    this.drawBlock({ dx: x, dy: floorRange[y] , name : obj })
                    }

                }
            }
        }

    }

    generateBlock2() {

        this.matriz[14][9] = { name: "stone", type: "block" }
        this.drawBlock({ dx : 9, dy : 14, name : "stone" })

        this.matriz[14][10] = { name: "stone", type: "block" }
        this.drawBlock({ dx : 10, dy : 14, name : "stone" })

        this.matriz[14][11] = { name: "stone", type: "block" }
        this.drawBlock({ dx : 11, dy : 14, name : "stone" })

        this.matriz[14][12] = { name: "stone", type: "block" }
        this.drawBlock({ dx : 12, dy : 14, name : "stone" })

        this.matriz[4][15] = 0
       

        this.matriz[13][10] = { name: "grass", type: "block" }
        this.drawBlock({ dx : 10, dy : 13, name : "grass" })

        this.matriz[10][0] = { name: "stone", type: "stone" }
        this.drawBlock({ dx : 0, dy : 10, name : "stone" })

        this.matriz[8][2] = { name: "grass", type: "block" }
        this.drawBlock({ dx : 2, dy : 8, name : "grass" })

        this.matriz[19][3] = { name: "grass", type: "block" }
        this.drawBlock({ dx : 3, dy : 19, name : "grass" })
        this.matriz[19][4] = { name: "grass", type: "block" }
        this.drawBlock({ dx : 4, dy : 19, name : "grass" })
    }



}