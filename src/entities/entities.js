import { MapGame } from "../main.js"

export class Entities extends MapGame {

    constructor() {
        super()
        this.entities = {} //Aca se guardan todas las entidades generadas
    }


    drawEntity({ dx, dy, img, hit_box, direction }) {

        const pixel = this.pixel
        const ctx = this.ctx
        const newX = dx * pixel
        const newY = dy * pixel

        if (direction == "left") {
            const flippedX = -newX - hit_box.width
            ctx.save(); // Guardar el estado actual del contexto
            ctx.scale(-1, 1)
            ctx.drawImage(img, flippedX, newY, hit_box.width, hit_box.height);
            ctx.restore();
        } else {

            ctx.drawImage(img, newX, newY, hit_box.width, hit_box.height);
        }
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

                if (y == 0) {
                    ctx.clearRect(newX, newY, hit_box.width, hit_box.height)
                }

                this.matriz[position.y + y][position.x + x] = 0
            }
        }
    }

    setStageFrames({ entity, action }) {


        const { name, id } = entity

        const { frames } = this.models[name]

        const currentEntity = this.entities[name][id]

        const { position } = currentEntity

        const verificationAction = action != position.action.name ? -1 : position.action.stage_frames

        const currentStage = verificationAction + 1

        const vericationStage = currentStage > (frames[action].length - 1) ? 0 : currentStage

        position.action = { name: action, stage_frames: vericationStage }
    }

    moveEntity({ entity, dx = 0, dy = 0, action = "idle", direction }) {

        const { name, id } = entity

        const { hit_box, frames } = this.models[name]

        const currentEntity = this.entities[name][id]

        const { position } = currentEntity

        const currentDirection = direction ?? position.direction

        const currentframes = frames[action]

        this.drawEntityRemove({ entity })

        this.setStageFrames({ entity, action })

        this.detectCollision({ entity, dx, dy, direction: currentDirection })

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = dx + x + position.x

                const newY = dy + y + position.y

                if (y == 0) { //=> Solo se dibuja del pixel mas alto para abajo
                    this.drawEntity({
                        dx: newX,
                        dy: newY,
                        img: currentframes[position.action.stage_frames],
                        hit_box,
                        direction: currentDirection
                    })
                }

                this.matriz[newY][newX] = entity
            }
        }
        currentEntity.position["x"] = dx + position.x
        currentEntity.position["y"] = dy + position.y
        currentEntity.position.direction = currentDirection
    }

    detectCollision({ entity, dx, dy, direction }) {

        const { name, id } = entity

        const { hit_box } = this.models[name]

        const { position } = this.entities[name][id]

        console.log(position)
        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = Math.round(x + dx + position.x)
                const newY = Math.round(y + dy + position.y)

                console.log(this.matriz[newY][newX])
            }
        }

    }

    entityIdle({ entity, idle }) {

        const { name, id } = entity

        const currentEntity = this.entities[name][id]

        const action = currentEntity.drawn ? "idleAttack" : "idle"

        const move = () => this.moveEntity({ entity, dx: 0, action });

        if (currentEntity.interval && !idle) {
            clearInterval(currentEntity.interval)
            currentEntity.interval = null
        } else if (idle && !currentEntity.interval) {

            const idle = () => setInterval(() => {
                move()
            }, 160);

            this.entities[name][id]["interval"] = idle()
        }
        
    }

    generateEntity(entity) {

        const id_generate = `${entity}:1`

        const currentEntity = { name: entity, id: id_generate }

        const property_defaults = {
            [id_generate]: {
                stats: {
                    health: 100, armor: 0, level: 0
                },
                position: {
                    action: { name: "idle", stage_frames: -1 },
                    direction: "rigth",
                    x: 0,
                    y: 0
                },
                skill_active: false,
                drawn: false,
                actions_execution_time: {}
            }
        }

        this.entities[entity] = { ...this.entities[entity], ...property_defaults }

        this.entityIdle({ entity: currentEntity, idle: true })

        this.moveEntity({ entity: currentEntity, dy: 13, dx: 0 })

    }

    entityAttack({ action, entity }) { //=> Ataques y skills se manejan de la misma forma.

        const { id, name } = entity

        const currentModel = this.models[name]

        const frames = currentModel["frames"][action]

        const coldownAction = currentModel["actions_coldown"][action]

        const currentEntity = this.entities[name][id]

        const currentTime = currentEntity.actions_execution_time[action] > Date.now()

        if (currentTime) return

        currentEntity.actions_execution_time[action] = Date.now() + coldownAction

        currentEntity.skill_active = true

        currentEntity.drawn = true

        let countdown = frames.length - 1

        const interval = setInterval(() => {

            if (countdown <= 0) {
                this.entityIdle({ entity: entity, idle: true })
                currentEntity.skill_active = false
                clearInterval(interval)
            }

            countdown -= 1

            this.moveEntity({ action, entity })

        }, 50)

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
        //         requestframesFrame(animate)
        //     } else {
        //         this.entities[entity]["jumping"] = false
        //     }
        // }

        // requestframesFrame(animate)
    }
}