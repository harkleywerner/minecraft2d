import { MapGame } from "../main.js"

export class Entities extends MapGame {

    constructor() {
        super()
        this.entities = {} //Aca se guardan todas las entidades generadas
    }


    drawEntity({ dx, dy, img, hit_box, test }) {

        const pixel = this.pixel
        const ctx = this.ctx
        const newX = dx * pixel
        const newY = dy * pixel

        if(test){
            ctx.save(); // Guardar el estado actual del contexto
            ctx.scale(-1, 1)
            ctx.drawImage(img, -hit_box.width, dy * pixel,hit_box.width,hit_box.height);
            ctx.restore();
        }else {

            ctx.drawImage(img, newX, newY, hit_box.width, hit_box.height);
        }
        // Reflejar la imagen horizontalmente


    }

    drawEntityRemove({ entity }) {

        const ctx = this.ctx

        const { name, id } = entity

        const { hit_box } = this.models[name]

        const { position } = this.entities[name][id]

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = (position.x + x) * this.pixel
                const newY = (position.y + y) * this.pixel


                if (hit_box.y == y + 1) {
                    ctx.clearRect(newX, newY, hit_box.width, hit_box.height)
                }

                this.matriz[position.y + y][position.x + x] = 0
            }
        }
    }

    moveEntity({ entity, dx = 0, dy = 0, action = "idle" }) {

        const { name, id } = entity

        const { hit_box, animations } = this.models[name]

        const currentEntity = this.entities[name][id]

        const { position } = currentEntity

        const currentStage = position.stage_animation + 1

        const currentAnimation = animations[action]

        const vericationStage = currentStage > (animations[action].length - 1) ? 0 : currentStage

        position.stage_animation = vericationStage

        this.drawEntityRemove({ entity })

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = dx + x + position.x

                const newY = dy + y + position.y


                if (hit_box.y == y + 1) {
                    this.drawEntity({
                        dx: newX,
                        dy: newY,
                        img: currentAnimation[position.stage_animation],
                        hit_box,
                        test: name == "playessr"
                    })
                }

                this.matriz[newY][newX] = entity
            }
        }
        currentEntity.position["x"] = dx + position.x
        currentEntity.position["y"] = dy + position.y
        currentEntity.position.action = action
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
                    stage_animation: -1,
                    x: 0,
                    y: 0
                }
            }

        }

        this.entities[entity] = { ...this.entities[entity], ...property_defaults }

        this.moveEntity({ entity: { name: entity, id: id_generate }, dy: 12, dx: 0 })

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