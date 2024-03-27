import { Blocks } from "../blocks/blocks.js"
import { player_variants } from "./player.variants.js"

export class Entities extends Blocks {

    constructor() {
        super()
        this.enties_variants = {
            ...player_variants,
        }
        this.entities = {} //Aca se guardan todas las entidades generadas
    }


     drawEntity({ dx, dy, src, pixel_x, pixel_y }) {

        const pixel = this.pixel

        const ctx = this.ctx

        const newX = dx * pixel
        const newY = dy * pixel

        ctx.fillStyle = "red"; 
        ctx.fillRect(newX - 10, newY, pixel_x, pixel_y); 

    }

    drawEntityRemove({ entity }) {

        const ctx = this.ctx

        const skin = this.enties_variants[entity]

        const { position } = this.entities[entity]

        for (let y = 0; y < skin.length; y++) {

            const pieces = skin[y]

            for (let x = 0; x < pieces.length; x++) {

                const { pixel_x, pixel_y = 25 } = pieces[x]

                const newX = (position.x + x) * this.pixel
                const newY = (position.y + y) * this.pixel

                this.matriz[position.y + y][position.x + x] = 0

                ctx.clearRect(newX - 10, newY, pixel_x, pixel_y)
            }
        }
    }

     moveEntity({ entity, dx = 0, dy = 0, direction = "rigth" }) {

        const skin = this.enties_variants[entity]

        const entityActually = this.entities[entity]

        this.drawEntityRemove({ entity })

        const { x = 0, y = 0 } = entityActually.position

        for (let i = 0; i < skin.length; i++) {

            const pieces = skin[i]

            for (let j = 0; j < pieces.length; j++) {

                const { src, pixel_x, pixel_y = 25 } = pieces[j]

                const newX = dx + x + j

                const newY = dy + y + i

                 this.drawEntity({ dx: newX, dy: newY, src, pixel_x, pixel_y })

                this.matriz[newY][newX] = { name: entity, id: entity }
            }
        }

        entityActually.position["x"] = dx + x
        entityActually.position["y"] = dy + y
        entityActually.position.direction = direction
    }


    generateEntity(entity) {

        const property_defaults = {
            stats: {
                health: 100, armor: 0, level: 0
            },
            position: { jumping: false, direction: "rigth", x: 0, y: 0 }
        }

        this.entities[entity] = property_defaults

        this.moveEntity({ entity, dy: 12 })

    }


    jump({ entity }) {

        // const { jumping } = this.entities[entity]

        // if (jumping) return

        // this.entities[entity]["jumping"] = true

        // const duration = 1000

        // const startTime = performance.now()

        // const animate = (currentTime) => {

        //     const elapsedTime = currentTime - startTime
        //     const progress = elapsedTime / duration
        //     const gravity = elapsedTime < 500 ? - 1 : +1

        //     const newY = this.dy + gravity

        //     this.lienzo({ dy: newY });

        //     this.dy = newY

        //     if (progress < 1) {
        //         requestAnimationFrame(animate)
        //     } else {
        //         this.entities[entity]["jumping"] = false
        //     }
        // }

        // requestAnimationFrame(animate)
    }
}