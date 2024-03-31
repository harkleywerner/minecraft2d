import { MapGame } from "../main.js"

export class Entities extends MapGame {

    constructor() {
        super()
        this.entities = {} //Aca se guardan todas las entidades generadas
        this.test = false;
    }

    drawEntity({
        entity,
        action,
    }) {

        const { name, id } = entity

        const { position } = this.entities[name][id]

        const { frames, hit_box } = this.models[name]

        const currentFrame = frames[action]

        const ctx = this.ctx

        const img = currentFrame[position.action.stage_frames]
        const pixel = this.pixel
        const newX = (Math.round(position.x)) * pixel
        const newY = (Math.round(position.y)) * pixel

        if (position.direction == "left") {
            const flippedX = -newX - hit_box.width
            ctx.save(); // Guardar el estado actual del contexto
            ctx.scale(-1, 1)
            ctx.drawImage(img, flippedX, newY, hit_box.width, hit_box.height);
            ctx.restore();
        } else {
            ctx.save()
            ctx.drawImage(img, newX, newY, hit_box.width, hit_box.height);
            ctx.restore()
        }

    }

    drawEntityRemove({ entity }) {

        const ctx = this.ctx

        const { name, id } = entity

        const { hit_box } = this.models[name]

        const { position } = this.entities[name][id]

        const newX = (Math.round(position.x)) * this.pixel
        const newY = (Math.round(position.y)) * this.pixel

        ctx.clearRect(newX, newY, hit_box.width, hit_box.height)

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

    clearMoveEntity({ entity }) {

        const { name, id } = entity

        const { position } = this.entities[name][id]
        const { hit_box } = this.models[name]

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = position.x + x
                const newY = position.y + y

                this.matriz[newY][newX] = 0
            }
        }
    }

    moveEntity({ entity, dx = 0, dy = 0, action = "idle", direction }) {

        const { name, id } = entity

        const colission = this.detectCollision({ dx, dy, entity })

        const { hit_box } = this.models[name]

        const currentEntity = this.entities[name][id]

        const { position } = currentEntity

        const currentDirection = direction ?? position.direction

        !colission && this.clearMoveEntity({ entity })

        this.setStageFrames({ entity, action: action })

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const newX = Math.floor(x + dx + position.x)
                const newY = Math.floor(y + dy + position.y)

                if (!colission) {
                    this.matriz[newY][newX] = entity
                }
            }
        }

        const newPositionX = colission ? position.x : dx + position.x
        const newPositionY = colission ? position.y : dy + position.y

        this.drawEntityRemove({ entity })

        currentEntity.position.direction = currentDirection

        currentEntity.position["x"] = newPositionX
        currentEntity.position["y"] = newPositionY

        this.drawEntity({ entity, action: action })

        if (colission) return colission

        if (this.matriz[newPositionY + 2][newPositionX] == 0 && !currentEntity.fallin && !currentEntity.god_mode) {
            currentEntity.isGrounded = false
            this.entityGravity({ entity, dx, dy })
        } else if (this.matriz[newPositionY + 2][newPositionX] !== 0) {
            currentEntity.isGrounded = true
        } else if (this.matriz[newPositionY + 2][newPositionX] == 0 && currentEntity.god_mode) {
            currentEntity.isGrounded = false
        }
    }

    detectCollision({ entity, dx = 0, dy = 0 }) {

        const { name, id } = entity

        const { hit_box } = this.models[name]

        const { position } = this.entities[name][id]

        for (let y = 0; y < hit_box.y; y++) {

            for (let x = 0; x < hit_box.x; x++) {

                const xRound = Math.floor(x + dx + position.x)
                const yRound = Math.floor(y + dy + position.y)

                const newX = xRound < 0 ? x : xRound
                const newY = yRound < 0 ? y : yRound

                const object = this.matriz[newY][newX]

                if (object && object?.name != name || xRound < 0 || yRound < 0) {

                    return object == 0 ? { name: "air" } : object
                }

            }
        }

    }

    entityGravity({ entity }) {

        const { name, id } = entity

        const currentEntity = this.entities[name][id]

        if (currentEntity.fallin) return

        currentEntity.fallin = true

        this.moveEntity({ entity, dy: 1, action: "fall" })

        const interval = setInterval(() => {

            const collision = this.moveEntity({ entity, dy: 1, action: "fall" })

            if (collision || currentEntity.god_mode) {
                currentEntity.fallin = false
                clearInterval(interval)
                this.entityIdle({ entity, idle: true })
            }

        }, 200);
    }


    entityGodMode({ entity }) {

        const { id, name } = entity

        const currentEntity = this.entities[name][id]

        currentEntity.god_mode = !currentEntity.god_mode

        const dy = currentEntity.god_mode ? -1 : 0

        this.moveEntity({ entity, dy })

    }


    generateEntity(entity, dx = 0) {
        

        const entityCount = Object.keys(this.entities[entity] || {})

        const id_generate = `${entity}:${entityCount.length}`

        const currentEntity = { name: entity, id: id_generate, type: "mob" }

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
                jump: false,
                fallin: false,
                attack_active: false,
                drawn: false,
                actions_execution_time: {},
                isGrounded: false,
                god_mode: false
            }
        }

        this.entities[entity] = { ...this.entities[entity], ...property_defaults }

        this.moveEntity({ entity: currentEntity, dy: 13, dx })

        this.entityIdle({ entity: currentEntity, idle: true })

    }

    entityIdle({ entity, idle }) {

        const { name, id } = entity

        const currentEntity = this.entities[name][id]

        const action = currentEntity.drawn ? "idleAttack" : "idle"

        if (currentEntity.interval && !idle) {
            clearInterval(currentEntity.interval)
            currentEntity.interval = null
        } else if (idle && !currentEntity.interval && !currentEntity.fallin && !currentEntity.jump && !currentEntity.attack_active) {

            const idle = () => setInterval(() => {
                this.drawEntityRemove({ entity })
                this.setStageFrames({ entity, action: action })
                this.drawEntity({ entity, action })
            }, 120);

            this.entities[name][id]["interval"] = idle()
        }

    }


    entityJump({ entity, dy }) {

        const { name, id } = entity

        const currentEntity = this.entities[name][id]

        if (currentEntity.jump || currentEntity.fallin) return

        let countdown = 0

        currentEntity.jump = true

        const interval = setInterval(() => {

            if (countdown >= Math.abs(dy)) {
                currentEntity.jump = false
                return clearInterval(interval)
            }

            countdown += 1

            this.moveEntity({
                entity,
                dy: -1,
                action: "jump",
            })

        }, 50);
    }

    entityRun({ entity, dx, direction }) {

        const { name, id } = entity

        const { fallin, jump, attack_active } = this.entities[name][id]

        if (attack_active) return

        let action = "run"

        if (fallin) {
            action = "fall"
        } else if (jump) {
            action = "jump"
        }

        this.moveEntity({ action, dx, direction, entity })


    }

    entityColdown({ entity, action }) {

        const { id, name } = entity

        const currentEntity = this.entities[name][id]

        const currentTime = currentEntity.actions_execution_time?.[action] > Date.now()

        return currentTime

    }


    entityAttack({ action, entity }) { //=> Ataques y skills se manejan de la misma forma.

        const { id, name } = entity

        const currentModel = this.models[name]

        const frames = currentModel["frames"][action]

        const coldownAction = currentModel["actions_coldown"][action]

        const currentEntity = this.entities[name][id]

        const currentTime = currentEntity.actions_execution_time[action] > Date.now()

        const rangeAttack = 3

        if (currentTime || currentEntity.jump) return

        currentEntity.actions_execution_time[action] = Date.now() + coldownAction

        currentEntity.attack_active = true

        currentEntity.drawn = true

        let countdown = frames.length - 1

        const startAttack = (count = 0) => {

            if (count >= rangeAttack) return

            const currentDirection = currentEntity.position.direction == "rigth"

            const collision = this.detectCollision({ dx: currentDirection ? count : -count, entity })

            if (collision && collision?.type == "mob") {

                const { name, id } = collision

                const entityCurrentAttack = this.entities[name][id]

                entityCurrentAttack.stats.health -= 100

                if (entityCurrentAttack.stats.health <= 0) {
                    this.entityIdle({ entity: collision, idle: false })
                    this.clearMoveEntity({ entity: collision })
                    this.drawEntityRemove({ entity: collision })
                    return
                }

            }

            startAttack(count + 1)
        }



        const interval = setInterval(() => {

            if (countdown <= 0) {
                currentEntity.attack_active = false
                this.entityIdle({ entity: entity, idle: true })
                startAttack()
                clearInterval(interval)
            }
            countdown -= 1
            this.drawEntityRemove({ entity })
            this.setStageFrames({ entity, action: action })
            this.drawEntity({ action: "attack", entity })

        }, 50)



    }
}
