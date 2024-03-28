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


    drawEntity({ dx, dy, src, hit_box }) {

        const img = new Image()

        img.src = "./adventurer-idle-00.png"

        const pixel = this.pixel

        const ctx = this.ctx

        const newX = dx * pixel
        const newY = dy * pixel

        img.onload = function() {
            ctx.drawImage(img,newX, newY, hit_box.width, hit_box.height);
        }

    }

    drawEntityRemove({ entity }) {

        const ctx = this.ctx

        const { name, id } = entity

        const { hit_box } = this.enties_variants[name]

        const { position } = this.entities[name][id]

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = (position.x + x) * this.pixel
                const newY = (position.y + y) * this.pixel

                
                if (hit_box.y == y + 1) {
                    console.log("F")
                    ctx.clearRect(newX, newY, hit_box.width, hit_box.height)
                }

                this.matriz[position.y + y][position.x + x] = 0
            }
        }
    }

    moveEntity({ entity, dx = 0, dy = 0, action = "idle" }) {


        const { name, id } = entity

        const { hit_box, animations } = this.enties_variants[name]

        const entityActually = this.entities[name][id]

        this.drawEntityRemove({ entity })

        const { position } = entityActually

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = dx + x + position.x

                const newY = dy + y + position.y

                if (hit_box.y == y + 1) {
                    this.drawEntity({ dx: newX, dy: newY, src: animations[action], hit_box })
                }

                this.matriz[newY][newX] = entity
            }
        }

        entityActually.position["x"] = dx + position.x
        entityActually.position["y"] = dy + position.y
        entityActually.position.action = action
    }


    generateEntity(entity) {

        const id_generate = `${entity}:1`

        const property_defaults = {
            [id_generate]: {
                stats: {
                    health: 100, armor: 0, level: 0
                },
                position: {
                    action: "idle",
                    stage_animation: 0,
                    x: 0,
                    y: 0
                }
            }

        }

        this.entities[entity] = { ...this.entities[entity], ...property_defaults }

        this.moveEntity({ entity: { name: entity, id: id_generate }, dy: 9, dx: 0 })

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