import EntityMovents from "./models/Entity/EntityMovents.js";
import Map from "./Map.js";
import Mob from "./models/Entity/Mob.js";
import Player from "./models/Entity/Player.js";


const map = new Map()

const player = new Player(map)

player.generateEntity(player)

const mob = new Mob(map)
mob.generateEntity(mob)

const test = (x, y) => {

    let max = 0

    const pixel = map.pixel
    while (max > 0) {

        const newX = Math.floor(Math.random() * (map.width / pixel))
        const newY = Math.floor(Math.random() * (map.heigth / pixel))

        if (map.matriz[newY] && map.matriz[newY][newX] === 0) {
            const entity = new EntityMovents(map)
            entity.generateEntity(entity, newX * pixel, newY * pixel)
            max -= 1
        }
    }
}

test()

const img = new Image()
img.src = "src/images/sky.jpg"

const animate = () => {

    map.ctx.clearRect(0, 0, map.width, map.heigth)

    Object.values(map.entityList).forEach(entity => {

        if (!entity.jumping && !player.pause && !entity.fly && player.onFreeFall) {
            entity.freeFall()
        }

        map.ctx.save()

        if (entity.sprite) {
            map.ctx.strokeStyle = "red"; // Color del borde
            map.ctx.lineWidth = 2;
            map.ctx.strokeRect(entity.x, entity.y, entity.width, entity.heigth)
            entity.sprite.injectSprite({ dx: entity.x, dy: entity.y })
        } else {
            map.ctx.globalCompositeOperation = "destination-over";
            map.ctx.fillStyle = entity.color || "red"
            map.ctx.fillRect(entity.x, entity.y, entity.width, entity.heigth)
        }

        map.ctx.restore()



    })


    map.ctx.save()
    map.ctx.globalCompositeOperation = "destination-over";
    map.ctx.drawImage(img, 0, 0, map.width, map.heigth);
    map.ctx.restore()

    requestAnimationFrame(animate)
}
animate()
